import {test} from 'node:test';
import assert from 'node:assert/strict';
import { searchYoutube } from '../server/youtube-search.js';
import handler from '../api/youtube-search.js';

const request = (query='Teste',method='GET') => new Request(`https://example.com/api/youtube-search?q=${encodeURIComponent(query)}`,{method});
test('rejeita método, consulta inválida e chave ausente sem consultar o Google',async () => {
  const options = {key:'',fetcher:() => { throw new Error('Não deve consultar'); }};
  assert.equal((await searchYoutube(request('','GET'),options)).status,400);
  assert.equal((await searchYoutube(request('x','POST'),options)).status,405);
  assert.equal((await searchYoutube(request('x'.repeat(201)),options)).status,400);
  assert.equal((await searchYoutube(request(),options)).status,503);
});
test('envia busca para vídeos incorporáveis e preserva cache no sucesso',async () => {
  const response=await searchYoutube(request('Luiz Gonzaga Asa Branca'),{key:'secret',fetcher:async url => {
    const params = new URL(url).searchParams;
    assert.equal(params.get('q'),'Luiz Gonzaga Asa Branca');
    assert.equal(params.get('videoEmbeddable'),'true');
    assert.equal(params.get('maxResults'),'1');
    assert.equal(params.get('order'),'relevance');
    assert.equal(params.get('key'),'secret');
    return Response.json({items:[{id:{videoId:'abcdefghijk'}}]});
  }});
  assert.equal(response.status,200);
  assert.match(response.headers.get('cache-control'),/86400/);
  assert.deepEqual(await response.json(),{videoId:'abcdefghijk'});
});
test('trata resultado vazio, cota excedida e falha de rede sem vazar chave',async () => {
  for (const [fetcher,status] of [
    [async()=>Response.json({items:[]}),404],
    [async()=>new Response('secret',{status:403}),502],
    [async()=>{throw new Error('secret');},504],
  ]) {
    const result=await searchYoutube(request(),{key:'secret',fetcher});
    assert.equal(result.status,status);
    assert.ok(!(await result.text()).includes('secret'));
  }
});
test('adaptador Vercel escreve status, cabeçalhos e corpo', async () => {
  const headers={}; let body;
  const res={setHeader:(key,value)=>headers[key]=value,end:value=>body=value};
  await handler({url:'/api/youtube-search?q=',method:'GET'},res);
  assert.equal(res.statusCode,400);
  assert.match(headers['content-type'],/application\/json/);
  assert.equal(JSON.parse(body).error,'Busca inválida.');
});

test('repete falha temporária de conexão e retorna vídeo na segunda tentativa', async () => {
  let calls = 0;
  const result = await searchYoutube(request(), {key:'secret', fetcher:async () => {
    if (++calls === 1) throw new TypeError('fetch failed');
    return Response.json({items:[{id:{videoId:'abcdefghijk'}}]});
  }});
  assert.equal(calls,2);
  assert.equal(result.status,200);
});
test('mostra orientação específica quando a API está desativada', async () => {
  const result = await searchYoutube(request(), {key:'secret', fetcher:async () => Response.json({error:{errors:[{reason:'accessNotConfigured'}]}},{status:403})});
  assert.match((await result.json()).error,/Habilite a YouTube Data API v3/);
});

test('primeiro resultado é usado e recarregamento não usa cache', async () => {
  const req=new Request('https://example.com/api/youtube-search?q=Musica&refresh=1');
  const result=await searchYoutube(req,{key:'secret',fetcher:async (url,options) => {
    assert.equal(options.cache,'no-store');
    return Response.json({items:[{id:{videoId:'primeiro'}},{id:{videoId:'segundo'}}]});
  }});
  assert.equal(result.headers.get('cache-control'),'no-store');
  assert.deepEqual(await result.json(),{videoId:'primeiro'});
});
