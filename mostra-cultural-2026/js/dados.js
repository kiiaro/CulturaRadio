// =====================================================
// MOSTRA CULTURAL 2026 - BRASIL PLURAL
// Projeto da turma 3º C - Desenvolvimento de Sistemas (ADS)
// MEDIOTEC - SENAC
// =====================================================

// ---------- 1. DADOS ----------
const coresRegiao = { Nordeste: "#B94A32", Sudeste: "#176B4D", Sul: "#173B57", Norte: "#E7B83C", "Centro-Oeste": "#5a4a2a" };

const regioes = ["Nordeste", "Norte", "Sudeste", "Sul", "Centro-Oeste"];

const artistas = [
  {
    id: "reginaldo-rossi",
    nome: "Reginaldo Rossi",
    apelido: "O Rei do Brega",
    nascimento: "14/02/1944",
    falecimento: "20/12/2013",
    origem: "Recife (PE)",
    regiao: "Nordeste",
    generos: ["Brega", "Romântico"],
    periodo: "1960–2013",
    curadoria: "Uma voz marcante da música popular nordestina",
    biografia: "Cantor e compositor recifense, começou nos anos 1960 ligado ao rock e à Jovem Guarda e se consagrou com canções românticas, que o tornaram conhecido como o Rei do Brega.",
    legado: "Referência do brega e da música popular de Pernambuco.",
    musicas: [
      { titulo: "Garçom", ano: 1987, album: "", video: "" },
      { titulo: "A Raposa e as Uvas", ano: null, album: "", video: "" },
      { titulo: "Mon Amour, Meu Bem, Ma Femme", ano: null, album: "", video: "https://www.youtube.com/watch?v=OMbXuJVeuGs" },
      { titulo: "Quando Você Foi Embora", ano: null, album: "", video: "" },
      { titulo: "Em Plena Lua de Mel", ano: null, album: "", video: "" },
      { titulo: "As Quatro Estações", ano: null, album: "", video: "" },
    ],
    albuns: [
    ],
    wikipedia: "Reginaldo_Rossi"
  },
  {
    id: "luiz-gonzaga",
    nome: "Luiz Gonzaga",
    apelido: "O Rei do Baião",
    nascimento: "13/12/1912",
    falecimento: "02/08/1989",
    origem: "Exu (PE)",
    regiao: "Nordeste",
    generos: ["Baião", "Forró"],
    periodo: "1940–1980",
    curadoria: "O baião que levou o Nordeste para o Brasil",
    biografia: "Filho do sertão pernambucano, aprendeu sanfona com o pai. Nos anos 1940, no Rio de Janeiro, levou o baião e o universo nordestino ao rádio nacional.",
    legado: "Consolidou o baião e é referência central do forró.",
    musicas: [
      { titulo: "Asa Branca", ano: 1947, album: "", video: "" },
      { titulo: "Xote das Meninas", ano: 1953, album: "", video: "" },
      { titulo: "Baião", ano: 1946, album: "", video: "" },
      { titulo: "Assum Preto", ano: 1950, album: "", video: "" },
      { titulo: "Paraíba", ano: 1952, album: "", video: "" },
      { titulo: "No Meu Pé de Serra", ano: 1946, album: "", video: "" },
    ],
    albuns: [
    ],
    wikipedia: "Luiz_Gonzaga"
  },
  {
    id: "roberto-carlos",
    nome: "Roberto Carlos",
    apelido: "O Rei",
    nascimento: "19/04/1941",
    falecimento: "",
    origem: "Cachoeiro de Itapemirim (ES)",
    regiao: "Sudeste",
    generos: ["Jovem Guarda", "Romântico"],
    periodo: "1960–atualidade",
    curadoria: "Da Jovem Guarda à canção romântica",
    biografia: "Capixaba, tornou-se nos anos 1960 o grande nome da Jovem Guarda e depois da canção romântica brasileira, com forte presença na TV e no rádio.",
    legado: "Um dos artistas mais populares da história do país.",
    musicas: [
      { titulo: "Detalhes", ano: 1971, album: "", video: "https://www.youtube.com/watch?v=rzrH-bSSD2M" },
      { titulo: "Como É Grande o Meu Amor por Você", ano: 1967, album: "", video: "https://www.youtube.com/watch?v=Vtt7kCtdc_4" },
      { titulo: "Emoções", ano: 1981, album: "", video: "https://www.youtube.com/watch?v=M4aD0skx7AI" },
      { titulo: "Lady Laura", ano: 1978, album: "", video: "" },
      { titulo: "É Preciso Saber Viver", ano: 1974, album: "", video: "" },
      { titulo: "Amigo", ano: 1977, album: "", video: "" },
    ],
    albuns: [
      { titulo: "Roberto Carlos em Ritmo de Aventura", ano: 1967 },
    ],
    wikipedia: "Roberto_Carlos"
  },
  {
    id: "caetano-veloso",
    nome: "Caetano Veloso",
    apelido: "",
    nascimento: "07/08/1942",
    falecimento: "",
    origem: "Santo Amaro (BA)",
    regiao: "Nordeste",
    generos: ["Tropicália", "MPB"],
    periodo: "1960–atualidade",
    curadoria: "A canção como pensamento e vanguarda",
    biografia: "Compositor e cantor, liderou com Gilberto Gil o movimento tropicalista em 1967–68, unindo vanguarda, cultura pop e tradição brasileira.",
    legado: "Referência da canção e do pensamento cultural brasileiro.",
    musicas: [
      { titulo: "Sampa", ano: 1978, album: "Muito (Dentro da Estrela Azulada)", video: "" },
      { titulo: "Você é Linda", ano: 1983, album: "Uns", video: "" },
      { titulo: "Sozinho", ano: null, album: "", video: "" },
      { titulo: "Alegria, Alegria", ano: 1967, album: "", video: "" },
      { titulo: "Tropicália", ano: 1968, album: "", video: "" },
      { titulo: "O Leãozinho", ano: 1977, album: "Bicho", video: "" },
    ],
    albuns: [
      { titulo: "Transa", ano: 1972 },
      { titulo: "Muito (Dentro da Estrela Azulada)", ano: 1978 },
    ],
    wikipedia: "Caetano_Veloso"
  },
  {
    id: "elis-regina",
    nome: "Elis Regina",
    apelido: "Pimentinha",
    nascimento: "17/03/1945",
    falecimento: "19/01/1982",
    origem: "Porto Alegre (RS)",
    regiao: "Sul",
    generos: ["MPB", "Bossa Nova"],
    periodo: "1960–1982",
    curadoria: "A intérprete que deu voz às canções de uma geração",
    biografia: "Gaúcha, projetou-se nacionalmente nos anos 1960 e foi considerada por muitos a maior intérprete do país.",
    legado: "Referência de interpretação na música brasileira.",
    musicas: [
      { titulo: "Como Nossos Pais", ano: 1976, album: "Falso Brilhante", video: "" },
      { titulo: "Águas de Março", ano: 1974, album: "Elis & Tom", video: "" },
      { titulo: "O Bêbado e a Equilibrista", ano: 1979, album: "Essa Mulher", video: "https://www.youtube.com/watch?v=sk0FGZuCD9o" },
      { titulo: "Madalena", ano: 1970, album: "Em Pleno Verão", video: "" },
      { titulo: "Upa, Neguinho", ano: 1966, album: "Dois na Bossa", video: "" },
      { titulo: "Fascinação", ano: 1978, album: "", video: "" },
    ],
    albuns: [
      { titulo: "Elis & Tom", ano: 1974 },
      { titulo: "Falso Brilhante", ano: 1976 },
      { titulo: "Essa Mulher", ano: 1979 },
    ],
    wikipedia: "Elis_Regina"
  },
  {
    id: "chico-buarque",
    nome: "Chico Buarque",
    apelido: "",
    nascimento: "19/06/1944",
    falecimento: "",
    origem: "Rio de Janeiro (RJ)",
    regiao: "Sudeste",
    generos: ["MPB", "Samba"],
    periodo: "1960–atualidade",
    curadoria: "Canção, poesia e resistência",
    biografia: "Compositor, escritor e dramaturgo, ganhou projeção nos festivais dos anos 1960. Parte de sua obra dialogou com a ditadura militar, como Apesar de Você.",
    legado: "Referência da canção e da literatura brasileiras.",
    musicas: [
      { titulo: "Construção", ano: 1971, album: "Construção", video: "https://www.youtube.com/watch?v=suia_i5dEZc" },
      { titulo: "Apesar de Você", ano: 1970, album: "", video: "" },
      { titulo: "A Banda", ano: 1966, album: "", video: "" },
      { titulo: "João e Maria", ano: 1977, album: "Os Saltimbancos Trapalhões", video: "" },
      { titulo: "O Que Será (À Flor da Pele)", ano: 1976, album: "Meus Caros Amigos", video: "" },
      { titulo: "Geni e o Zepelim", ano: 1977, album: "Ópera do Malandro", video: "" },
    ],
    albuns: [
      { titulo: "Construção", ano: 1971 },
    ],
    wikipedia: "Chico_Buarque"
  },
  {
    id: "gal-costa",
    nome: "Gal Costa",
    apelido: "",
    nascimento: "26/09/1945",
    falecimento: "09/11/2022",
    origem: "Salvador (BA)",
    regiao: "Nordeste",
    generos: ["Tropicália", "MPB"],
    periodo: "1960–2022",
    curadoria: "Uma voz versátil, do tropicalismo ao pop",
    biografia: "Baiana, integrou o círculo da Tropicália nos anos 1960 e construiu uma carreira marcada pela versatilidade vocal.",
    legado: "Uma das grandes vozes da música brasileira.",
    musicas: [
      { titulo: "Baby", ano: 1968, album: "", video: "" },
      { titulo: "Chuva de Prata", ano: null, album: "", video: "" },
      { titulo: "Meu Nome é Gal", ano: 1969, album: "Gal Costa", video: "" },
      { titulo: "Divino, Maravilhoso", ano: 1969, album: "Gal Costa", video: "" },
      { titulo: "Vapor Barato", ano: 1971, album: "Fa-Tal – Gal a Todo Vapor", video: "" },
      { titulo: "Força Estranha", ano: 1979, album: "Gal Tropical", video: "" },
    ],
    albuns: [
      { titulo: "Gal Costa", ano: 1969 },
      { titulo: "Fa-Tal – Gal a Todo Vapor", ano: 1971 },
      { titulo: "Índia", ano: 1973 },
    ],
    wikipedia: "Gal_Costa"
  },
  {
    id: "rita-lee",
    nome: "Rita Lee",
    apelido: "A Rainha do Rock Brasileiro",
    nascimento: "31/12/1947",
    falecimento: "08/05/2023",
    origem: "São Paulo (SP)",
    regiao: "Sudeste",
    generos: ["Rock"],
    periodo: "1966–2023",
    curadoria: "Irreverência e rock em português",
    biografia: "Começou nos Mutantes e seguiu carreira solo com humor, irreverência e rock em português.",
    legado: "Abriu espaço para mulheres no rock nacional.",
    musicas: [
      { titulo: "Ovelha Negra", ano: 1975, album: "Fruto Proibido", video: "" },
      { titulo: "Mania de Você", ano: 1979, album: "", video: "" },
      { titulo: "Lança Perfume", ano: 1980, album: "", video: "" },
      { titulo: "Doce Vampiro", ano: 1979, album: "Rita Lee", video: "" },
      { titulo: "Saúde", ano: 1981, album: "Saúde", video: "" },
      { titulo: "Amor e Sexo", ano: 2003, album: "Balacobaco", video: "" },
    ],
    albuns: [
      { titulo: "Fruto Proibido", ano: 1975 },
    ],
    wikipedia: "Rita_Lee"
  },
  {
    id: "marisa-monte",
    nome: "Marisa Monte",
    apelido: "",
    nascimento: "01/07/1967",
    falecimento: "",
    origem: "Rio de Janeiro (RJ)",
    regiao: "Sudeste",
    generos: ["MPB", "Pop"],
    periodo: "1989–atualidade",
    curadoria: "A MPB de uma geração mais recente",
    biografia: "Carioca, estreou no fim dos anos 1980 e se firmou nos 90. Integra o trio Tribalistas, com Arnaldo Antunes e Carlinhos Brown.",
    legado: "Nome central da MPB contemporânea.",
    musicas: [
      { titulo: "Beija Eu", ano: 1989, album: "MM", video: "" },
      { titulo: "Ainda Bem", ano: 2011, album: "", video: "" },
      { titulo: "Vilarejo", ano: 2006, album: "Infinito Particular", video: "https://www.youtube.com/watch?v=1jPfkC8oKQI" },
      { titulo: "Amor I Love You", ano: 2000, album: "Memórias, Crônicas e Declarações de Amor", video: "" },
      { titulo: "Na Estrada", ano: 1994, album: "Verde, Anil, Amarelo, Cor-de-Rosa e Carvão", video: "" },
      { titulo: "Segue o Seco", ano: 1994, album: "Verde, Anil, Amarelo, Cor-de-Rosa e Carvão", video: "" },
    ],
    albuns: [
      { titulo: "MM", ano: 1989 },
      { titulo: "Mais", ano: 1991 },
      { titulo: "Infinito Particular", ano: 2006 },
    ],
    wikipedia: "Marisa_Monte"
  },
  {
    id: "djavan",
    nome: "Djavan",
    apelido: "",
    nascimento: "27/01/1949",
    falecimento: "",
    origem: "Maceió (AL)",
    regiao: "Nordeste",
    generos: ["MPB"],
    periodo: "1976–atualidade",
    curadoria: "Harmonia e poesia vindas de Alagoas",
    biografia: "Alagoano, criou uma linguagem própria de harmonia e ritmo, com letras poéticas e melodias sofisticadas.",
    legado: "Um dos compositores mais influentes da MPB.",
    musicas: [
      { titulo: "Oceano", ano: 1989, album: "Oceano", video: "https://www.youtube.com/watch?v=P-lxOj0XpEE" },
      { titulo: "Flor de Lis", ano: 1976, album: "", video: "" },
      { titulo: "Sina", ano: 1982, album: "Luz", video: "" },
      { titulo: "Meu Bem Querer", ano: 1980, album: "Alumbramento", video: "" },
      { titulo: "Lilás", ano: 1984, album: "Lilás", video: "" },
      { titulo: "Eu Te Devoro", ano: 1998, album: "Bicho Solto", video: "" },
    ],
    albuns: [
      { titulo: "Seduzir", ano: 1981 },
      { titulo: "Luz", ano: 1982 },
      { titulo: "Oceano", ano: 1989 },
    ],
    wikipedia: "Djavan"
  },
  {
    id: "gilberto-gil",
    nome: "Gilberto Gil",
    apelido: "",
    nascimento: "26/06/1942",
    falecimento: "",
    origem: "Salvador (BA)",
    regiao: "Nordeste",
    generos: ["MPB", "Tropicália", "Reggae"],
    periodo: "1962–atualidade",
    curadoria: "Tradição e invenção em movimento",
    biografia: "Cantor, compositor e instrumentista baiano, foi uma das figuras centrais da Tropicália e construiu uma obra que combina ritmos brasileiros, rock e outras influências.",
    legado: "Uma das vozes mais influentes da música brasileira, com carreira artística e atuação cultural reconhecidas no país e no exterior.",
    musicas: [
      { titulo: "Aquele Abraço", ano: 1969, album: "Gilberto Gil (Cérebro Eletrônico)", video: "" },
      { titulo: "Andar com Fé", ano: 1982, album: "Um Banda Um", video: "" },
      { titulo: "Palco", ano: 1981, album: "Luar", video: "" }
    ],
    albuns: [
      { titulo: "Gilberto Gil (Cérebro Eletrônico)", ano: 1969 },
      { titulo: "Luar", ano: 1981 },
      { titulo: "Um Banda Um", ano: 1982 }
    ],
    wikipedia: "Gilberto_Gil"
  },
  {
    id: "milton-nascimento",
    nome: "Milton Nascimento",
    apelido: "Bituca",
    nascimento: "26/10/1942",
    falecimento: "",
    origem: "Rio de Janeiro (RJ) — criado em Três Pontas (MG)",
    regiao: "Sudeste",
    generos: ["MPB", "Clube da Esquina"],
    periodo: "1962–2022",
    curadoria: "Uma voz que transformou a canção brasileira",
    biografia: "Cantor, compositor e instrumentista nascido no Rio de Janeiro e criado em Três Pontas, Minas Gerais. Ganhou projeção nacional com Travessia e tornou-se um dos nomes centrais do Clube da Esquina.",
    legado: "Sua voz e suas composições marcaram a MPB e alcançaram públicos de várias partes do mundo.",
    musicas: [
      { titulo: "Travessia", ano: 1967, album: "Milton Nascimento", video: "" },
      { titulo: "Maria, Maria", ano: 1978, album: "Clube da Esquina 2", video: "" },
      { titulo: "Canção da América", ano: 1979, album: "Sentinela", video: "" }
    ],
    albuns: [
      { titulo: "Milton Nascimento", ano: 1967 },
      { titulo: "Clube da Esquina 2", ano: 1978 },
      { titulo: "Sentinela", ano: 1980 }
    ],
    wikipedia: "Milton_Nascimento"
  },
  {
    id: "maria-bethania",
    nome: "Maria Bethânia",
    apelido: "Abelha-rainha",
    nascimento: "18/06/1946",
    falecimento: "",
    origem: "Santo Amaro (BA)",
    regiao: "Nordeste",
    generos: ["MPB", "Samba", "Canção de protesto"],
    periodo: "1964–atualidade",
    curadoria: "Poesia e intensidade na voz brasileira",
    biografia: "Cantora baiana, iniciou a carreira profissional no espetáculo Opinião, no Rio de Janeiro. Sua interpretação combina canção, poesia e referências da cultura popular brasileira.",
    legado: "Uma das intérpretes mais reconhecidas da música popular brasileira, com repertório que atravessa gerações.",
    musicas: [
      { titulo: "Explode Coração", ano: 1978, album: "Álibi", video: "" },
      { titulo: "Reconvexo", ano: 1989, album: "Memória da Pele", video: "" },
      { titulo: "Sonho Meu", ano: 1978, album: "Álibi", video: "" }
    ],
    albuns: [
      { titulo: "Álibi", ano: 1978 },
      { titulo: "Memória da Pele", ano: 1989 }
    ],
    wikipedia: "Maria_Bethânia"
  },
  {
    id: "jorge-ben-jor",
    nome: "Jorge Ben Jor",
    apelido: "",
    nascimento: "22/03/1939",
    falecimento: "",
    origem: "Rio de Janeiro (RJ)",
    regiao: "Sudeste",
    generos: ["Samba-rock", "MPB"],
    periodo: "1961–atualidade",
    curadoria: "Samba, guitarra e balanço inconfundível",
    biografia: "Cantor, compositor e violonista carioca, desenvolveu um estilo próprio que mistura samba, rock e outras sonoridades. Começou a carreira artística no início dos anos 1960.",
    legado: "Suas composições ajudaram a projetar a música brasileira no exterior e influenciaram diferentes gerações de artistas.",
    musicas: [
      { titulo: "Mas, Que Nada!", ano: 1963, album: "Samba Esquema Novo", video: "" },
      { titulo: "Chove Chuva", ano: 1963, album: "Samba Esquema Novo", video: "" },
      { titulo: "País Tropical", ano: 1969, album: "Jorge Ben", video: "" }
    ],
    albuns: [
      { titulo: "Samba Esquema Novo", ano: 1963 },
      { titulo: "Jorge Ben", ano: 1969 }
    ],
    wikipedia: "Jorge_Ben_Jor"
  },
  {
    id: "nara-leao",
    nome: "Nara Leão",
    apelido: "A musa da Bossa Nova",
    nascimento: "19/01/1942",
    falecimento: "07/06/1989",
    origem: "Vitória (ES)",
    regiao: "Sudeste",
    generos: ["Bossa Nova", "MPB"],
    periodo: "1963–1989",
    curadoria: "Uma intérprete aberta a muitos Brasis",
    biografia: "Cantora capixaba criada no Rio de Janeiro, participou do ambiente musical da Bossa Nova e ampliou seu repertório para incluir samba de morro, canção de protesto e novos compositores.",
    legado: "Ajudou a apresentar ao público obras de compositores fundamentais e mostrou a diversidade da canção brasileira.",
    musicas: [
      { titulo: "O Barquinho", ano: 1961, album: "", video: "" },
      { titulo: "Diz que Fui por Aí", ano: 1964, album: "Nara", video: "" },
      { titulo: "A Banda", ano: 1966, album: "", video: "" }
    ],
    albuns: [
      { titulo: "Nara", ano: 1964 },
      { titulo: "Opinião de Nara", ano: 1964 },
      { titulo: "Vento de Maio", ano: 1967 }
    ],
    wikipedia: "Nara_Leão"
  },
  {
    id: "fafa-de-belem",
    nome: "Fafá de Belém",
    apelido: "",
    nascimento: "10/08/1956",
    falecimento: "",
    origem: "Belém (PA)",
    regiao: "Norte",
    generos: ["MPB", "Música regional", "Romântico"],
    periodo: "1973–atualidade",
    curadoria: "A força amazônica na música brasileira",
    biografia: "Cantora paraense, estreou profissionalmente em Belém e ganhou projeção nacional nos anos 1970. Seu repertório reúne MPB, música regional, bolero, samba-canção e outros estilos.",
    legado: "Uma das artistas mais conhecidas do Pará, levou referências amazônicas a palcos e públicos de todo o Brasil.",
    musicas: [
      { titulo: "Vermelho", ano: null, album: "", video: "" },
      { titulo: "Nuvem de Lágrimas", ano: null, album: "", video: "" },
      { titulo: "Filho da Bahia", ano: null, album: "", video: "" }
    ],
    albuns: [],
    wikipedia: "Fafá_de_Belém"
  },
  {
    id: "dona-onete",
    nome: "Dona Onete",
    apelido: "A diva do carimbó chamegado",
    nascimento: "18/06/1939",
    falecimento: "",
    origem: "Cachoeira do Arari (PA)",
    regiao: "Norte",
    generos: ["Carimbó", "Música paraense"],
    periodo: "2012–atualidade",
    curadoria: "Carimbó, poesia e histórias do Pará",
    biografia: "Cantora, compositora e poetisa paraense. Depois de trabalhar como professora e atuar na cultura local, lançou seu primeiro disco aos 72 anos e tornou-se uma das grandes representantes do carimbó.",
    legado: "Sua obra celebra a cultura paraense e apresenta ritmos e narrativas amazônicas a novos públicos.",
    musicas: [
      { titulo: "Jamburana", ano: 2012, album: "Feitiço Caboclo", video: "" },
      { titulo: "No Meio do Pitiú", ano: 2016, album: "Banzeiro", video: "" },
      { titulo: "Lua Jaci", ano: 2016, album: "Banzeiro", video: "" }
    ],
    albuns: [
      { titulo: "Feitiço Caboclo", ano: 2012 },
      { titulo: "Banzeiro", ano: 2016 }
    ],
    wikipedia: "Dona_Onete"
  },
  {
    id: "lupicinio-rodrigues",
    nome: "Lupicínio Rodrigues",
    apelido: "Lupi",
    nascimento: "16/09/1914",
    falecimento: "27/08/1974",
    origem: "Porto Alegre (RS)",
    regiao: "Sul",
    generos: ["Samba-canção", "MPB"],
    periodo: "1935–1974",
    curadoria: "O compositor gaúcho da dor de cotovelo",
    biografia: "Compositor e cantor porto-alegrense, criou sambas-canção conhecidos por suas histórias de amor, saudade e desilusão. Suas obras foram gravadas por intérpretes de várias gerações.",
    legado: "Um dos compositores mais importantes do samba-canção brasileiro e autor de clássicos que seguem sendo regravados.",
    musicas: [
      { titulo: "Se Acaso Você Chegasse", ano: 1938, album: "", video: "" },
      { titulo: "Nervos de Aço", ano: 1947, album: "", video: "" },
      { titulo: "Felicidade", ano: 1947, album: "", video: "" }
    ],
    albuns: [],
    wikipedia: "Lupicínio_Rodrigues"
  },
  {
    id: "vitor-ramil",
    nome: "Vitor Ramil",
    apelido: "",
    nascimento: "07/04/1962",
    falecimento: "",
    origem: "Pelotas (RS)",
    regiao: "Sul",
    generos: ["MPB", "Milonga"],
    periodo: "1981–atualidade",
    curadoria: "A estética do frio em forma de canção",
    biografia: "Cantor, compositor e escritor de Pelotas, construiu uma obra marcada pela milonga e pelas paisagens culturais do extremo sul do Brasil e da região do Prata.",
    legado: "Criou uma linguagem própria para cantar o Sul e aproximou a música gaúcha de diferentes públicos da MPB.",
    musicas: [
      { titulo: "Estrela, Estrela", ano: 1981, album: "Estrela, Estrela", video: "" },
      { titulo: "Ramilonga", ano: 1997, album: "Ramilonga – A Estética do Frio", video: "" },
      { titulo: "Deixando o Pago", ano: 1997, album: "Ramilonga – A Estética do Frio", video: "" }
    ],
    albuns: [
      { titulo: "Estrela, Estrela", ano: 1981 },
      { titulo: "Ramilonga – A Estética do Frio", ano: 1997 }
    ],
    wikipedia: "Vitor_Ramil"
  },
  {
    id: "almir-sater",
    nome: "Almir Sater",
    apelido: "",
    nascimento: "14/11/1956",
    falecimento: "",
    origem: "Campo Grande (MS)",
    regiao: "Centro-Oeste",
    generos: ["Música caipira", "MPB", "Sertanejo"],
    periodo: "1981–atualidade",
    curadoria: "A viola pantaneira no coração do Brasil",
    biografia: "Cantor, compositor e violeiro sul-mato-grossense, desenvolveu uma sonoridade própria em torno da viola caipira e ganhou projeção nacional também por seu trabalho na televisão.",
    legado: "Tornou-se uma referência da viola brasileira e ajudou a divulgar a música e as paisagens do Pantanal.",
    musicas: [
      { titulo: "Tocando em Frente", ano: 1990, album: "", video: "" },
      { titulo: "Chalana", ano: 1990, album: "", video: "" },
      { titulo: "Um Violeiro Toca", ano: null, album: "Um Violeiro Toca", video: "" }
    ],
    albuns: [
      { titulo: "Instrumental II", ano: 1990 },
      { titulo: "Um Violeiro Toca", ano: 2006 }
    ],
    wikipedia: "Almir_Sater"
  },
  {
    id: "tete-espindola",
    nome: "Tetê Espíndola",
    apelido: "",
    nascimento: "11/03/1954",
    falecimento: "",
    origem: "Campo Grande (MS)",
    regiao: "Centro-Oeste",
    generos: ["MPB", "Música regional", "Experimental"],
    periodo: "1978–atualidade",
    curadoria: "Uma voz singular entre o Pantanal e a vanguarda",
    biografia: "Cantora, compositora e instrumentista sul-mato-grossense. Sua pesquisa vocal e o uso da craviola combinam elementos regionais, experimentação e referências aos sons da natureza.",
    legado: "Sua interpretação de Escrito nas Estrelas venceu o Festival dos Festivais em 1985 e tornou sua voz uma das mais singulares da música brasileira.",
    musicas: [
      { titulo: "Escrito nas Estrelas", ano: 1985, album: "", video: "" },
      { titulo: "Na Chapada", ano: 1986, album: "Gaiola", video: "" },
      { titulo: "Vida Cigana", ano: 1995, album: "Canção do Amor", video: "" }
    ],
    albuns: [
      { titulo: "Gaiola", ano: 1986 },
      { titulo: "Canção do Amor", ano: 1995 }
    ],
    wikipedia: "Tetê_Espíndola"
  }
];

const ritmos = [
  { nome: "Samba", texto: "Ritmo brasileiro marcado pela presença de percussão e dança, com raízes nas manifestações afro-brasileiras e forte desenvolvimento no Rio de Janeiro." },
  { nome: "Baião", texto: "Nascido no Nordeste, ganhou projeção nacional com Luiz Gonzaga. É marcado pela sanfona, zabumba e triângulo." },
  { nome: "Forró", texto: "Gênero e manifestação cultural nordestina que reúne diferentes ritmos e estilos de dança, tornando-se popular em todo o país." },
  { nome: "Brega", texto: "Estilo popular associado a canções românticas e melodramáticas. Em Pernambuco, ganhou uma identidade própria e forte presença cultural." },
  { nome: "Jovem Guarda", texto: "Movimento musical dos anos 1960 influenciado pelo rock e pelo pop, marcado por artistas como Roberto Carlos, Erasmo Carlos e Wanderléa." },
  { nome: "MPB", texto: "Sigla de Música Popular Brasileira. Reúne diferentes influências e gêneros, tornando-se uma das principais expressões da música brasileira." },
  { nome: "Rock", texto: "Gênero que ganhou força no Brasil principalmente a partir dos anos 1980, com diferentes artistas incorporando elementos da música brasileira." },
  { nome: "Tropicália", texto: "Movimento cultural do final dos anos 1960 que misturou rock, MPB, música regional e referências da cultura brasileira e internacional." }
];

const linhaDoTempo = [
  { periodo: "1930–1940", texto: "Rádio e popularização de gêneros regionais." },
  { periodo: "1950–1960", texto: "Bossa Nova." },
  { periodo: "1960–1970", texto: "Tropicália e transformações culturais." },
  { periodo: "1970–1980", texto: "Expansão da MPB." },
  { periodo: "1980–1990", texto: "Rock brasileiro e novas vozes." },
  { periodo: "1990–2000", texto: "Diversificação dos estilos." },
  { periodo: "2000–atualidade", texto: "Novas formas de produção e distribuição musical." }
];

export { artistas, coresRegiao, linhaDoTempo, regioes, ritmos };
