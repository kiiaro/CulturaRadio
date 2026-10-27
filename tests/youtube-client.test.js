import { test } from 'node:test';
import assert from 'node:assert/strict';
import { buscarMusica } from '../src/services/youtube.js';

test('busca título e artista mesmo quando a faixa possui vídeo antigo', async () => {
  const id = await buscarMusica({nome:'Reginaldo Rossi'}, {titulo:'Garçom',video:'https://www.youtube.com/watch?v=antigo'}, {
    fetcher:async url => {
      const params = new URL(url,'https://site.test').searchParams;
      assert.equal(params.get('q'),'Garçom Reginaldo Rossi');
      return Response.json({videoId:'8Xe8gApDRgU'});
    },
  });
  assert.equal(id,'8Xe8gApDRgU');
});
test('recarregar ignora cache e propaga sinal de cancelamento', async () => {
  const controller = new AbortController();
  await buscarMusica({nome:'Artista'}, {titulo:'Música'}, {refresh:true,signal:controller.signal,fetcher:async (url,options) => {
    assert.equal(new URL(url,'https://site.test').searchParams.get('refresh'),'1');
    assert.equal(options.cache,'no-store');
    assert.equal(options.signal,controller.signal);
    return Response.json({videoId:'8Xe8gApDRgU'});
  }});
});
test('falha de busca não retorna o vídeo antigo como substituto', async () => {
  await assert.rejects(buscarMusica({nome:'Artista'}, {titulo:'Música',video:'antigo'}, {
    fetcher:async () => Response.json({error:'Nenhum vídeo disponível.'},{status:404}),
  }),/Nenhum vídeo disponível/);
});
