// Fotos locais servidas pelo diretório public do Vite.
const fotos = {
  "luiz-gonzaga": "/assets/artistas/luiz-gonzaga.jpg",
  "marisa-monte": "/assets/artistas/marisa-monte.jpg",
  "reginaldo-rossi": "/assets/artistas/reginaldo-rossi.jpg",
  "rita-lee": "/assets/artistas/rita-lee.jpg",
  "roberto-carlos": "/assets/artistas/roberto-carlos.jpg",
  "caetano-veloso": "/assets/artistas/caetano-veloso.jpg",
  "chico-buarque": "/assets/artistas/chico-buarque.jpg",
  "djavan": "/assets/artistas/djavan.jpg",
  "elis-regina": "/assets/artistas/elis-regina.jpg",
  "gal-costa": "/assets/artistas/gal-costa.jpg"
};

// Fotografias locais de artistas adicionados, com créditos e licenças do Wikimedia Commons.
fotos["fafa-de-belem"] = "assets/artistas/fafa-de-belem.jpg";
fotos["dona-onete"] = "assets/artistas/dona-onete.jpg";
fotos["lupicinio-rodrigues"] = "assets/artistas/lupicinio-rodrigues.jpg";
fotos["vitor-ramil"] = "assets/artistas/vitor-ramil.jpg";
fotos["almir-sater"] = "assets/artistas/almir-sater.jpg";
fotos["tete-espindola"] = "assets/artistas/tete-espindola.jpg";

const creditosFotos = {
  "fafa-de-belem": { autor: "Sérgio (Savaman) Savarese", licenca: "CC BY-SA 2.0", pagina: "https://commons.wikimedia.org/wiki/File:Faf%C3%A1_de_Bel%C3%A9m.jpg", licencaUrl: "https://creativecommons.org/licenses/by-sa/2.0/" },
  "dona-onete": { autor: "Virada Sustentável", licenca: "CC BY-SA 2.0", pagina: "https://commons.wikimedia.org/wiki/File:Dona_Onete_VS_Fortaleza_2019_(49245119577).jpg", licencaUrl: "https://creativecommons.org/licenses/by-sa/2.0/" },
  "lupicinio-rodrigues": { autor: "Arquivo Nacional", licenca: "Domínio público", pagina: "https://commons.wikimedia.org/wiki/File:Lupic%C3%ADnio_Rodrigues_(1968).tif" },
  "vitor-ramil": { autor: "Ana Ruth Miranda / Cultura RS", licenca: "CC BY-SA 3.0", pagina: "https://commons.wikimedia.org/wiki/File:Vitorramil_culturars.jpg", licencaUrl: "https://creativecommons.org/licenses/by-sa/3.0/" },
  "almir-sater": { autor: "Cesarpedia", licenca: "CC BY-SA 3.0", pagina: "https://commons.wikimedia.org/wiki/File:Almir_Sater.JPG", licencaUrl: "https://creativecommons.org/licenses/by-sa/3.0/" },
  "tete-espindola": { autor: "Ministério da Cultura", licenca: "CC BY 2.0", pagina: "https://commons.wikimedia.org/wiki/File:Tet%C3%AA_Esp%C3%ADndola_-_Minist%C3%A9rio_da_Cultura_-_(127).jpg", licencaUrl: "https://creativecommons.org/licenses/by/2.0/" }
};

// Ponto de foco horizontal de cada foto (para o corte nao esconder o rosto)
const posicaoFotos = { "luiz-gonzaga": "68%", "marisa-monte": "42%", "reginaldo-rossi": "52%", "rita-lee": "50%", "roberto-carlos": "66%", "caetano-veloso": "62%", "chico-buarque": "45%", djavan: "62%", "elis-regina": "45%", "gal-costa": "48%", "fafa-de-belem": "50%", "dona-onete": "70%", "lupicinio-rodrigues": "50%", "vitor-ramil": "50%", "almir-sater": "50%", "tete-espindola": "50%" };

// Retratos que completam a galeria.
fotos["gilberto-gil"] = "assets/artistas/gilberto-gil.jpg";
posicaoFotos["gilberto-gil"] = "50%";
creditosFotos["gilberto-gil"] = {"autor":"Ricardo Stuckert / PR","licenca":"CC BY-SA 4.0","licencaUrl":"https://creativecommons.org/licenses/by-sa/4.0","pagina":"https://commons.wikimedia.org/wiki/File:22.05.2026_-_Gilberto_Gil_%28cropped%29.jpg"};
fotos["milton-nascimento"] = "assets/artistas/milton-nascimento.jpg";
posicaoFotos["milton-nascimento"] = "50%";
creditosFotos["milton-nascimento"] = {"autor":"Lula Oficial","licenca":"CC BY-SA 4.0","licencaUrl":"https://creativecommons.org/licenses/by-sa/4.0","pagina":"https://commons.wikimedia.org/wiki/File:Milton_Nascimento%2C_October_2022.jpg"};
fotos["maria-bethania"] = "assets/artistas/maria-bethania.jpg";
posicaoFotos["maria-bethania"] = "50%";
creditosFotos["maria-bethania"] = {"autor":"Lula Oficial","licenca":"CC BY-SA 4.0","licencaUrl":"https://creativecommons.org/licenses/by-sa/4.0","pagina":"https://commons.wikimedia.org/wiki/File:04.10.2025_-_Show_Maria_Bethania_em_S%C3%A3o_Paulo_%2854834138366%29_%28cropped%29.jpg"};
fotos["jorge-ben-jor"] = "assets/artistas/jorge-ben-jor.jpg";
posicaoFotos["jorge-ben-jor"] = "50%";
creditosFotos["jorge-ben-jor"] = {"autor":"Ricardo Giusti / PMPA","licenca":"Attribution","licencaUrl":null,"pagina":"https://commons.wikimedia.org/wiki/File:IBPA_2187_-_Show_N%C3%ADvea_com_Jorge_Benjor%2C_Skank_e_C%C3%A9u_-_2017-04-02_-_Ricardo_Giusti-PMPA_%28cropped%29.jpg"};
fotos["nara-leao"] = "assets/artistas/nara-leao.jpg";
posicaoFotos["nara-leao"] = "50%";
creditosFotos["nara-leao"] = {"autor":"Daniel Faria 69","licenca":"CC0","licencaUrl":"http://creativecommons.org/publicdomain/zero/1.0/deed.en","pagina":"https://commons.wikimedia.org/wiki/File:Narinha.jpg"};

export { creditosFotos, fotos, posicaoFotos };
