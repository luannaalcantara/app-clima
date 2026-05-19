
# Tempo Agora - Weather App

Este projeto foi desenvolvido exclusivamente para fins didáticos e educacionais como parte de um exercício prático de programação.

Um aplicativo de previsão do tempo moderno, minimalista e responsivo, construído com foco em experiência do usuário (UX) e interface fluida através de técnicas de Glassmorphism (efeito de vidro translúcido). 

O projeto consome dados em tempo real utilizando as APIs públicas de geolocalização e previsão climática do Open-Meteo.

---

## Funcionalidades

* Busca de Cidades em Tempo Real: Encontra as coordenadas geográficas de qualquer cidade digitada e retorna o clima atualizado na hora.
* Métricas Completas: Exibe temperatura principal, sensação térmica, umidade relativa do ar e velocidade do vento (todos os valores tratados de forma limpa como números inteiros).
* Sistema de Favoritos: Permite salvar suas cidades preferidas no navegador.
* Persistência de Dados: Utiliza localStorage para manter a lista de cidades favoritadas salva, mesmo após fechar ou atualizar a página.
* Gerenciamento Simples: Opção de remover cidades da lista de favoritos com um único clique.
* Layout Responsivo e Glassmorphic: Interface adaptável para dispositivos móveis e desktops, utilizando filtros de desfoque modernos (backdrop-filter) e gradientes atraentes.

---

## Tecnologias Utilizadas

* HTML5: Estrutura semântica da aplicação.
* CSS3: Estilização avançada, CSS Grid, Flexbox e efeitos de transparência (Glassmorphism).
* JavaScript (ES6+): Manipulação assíncrona do DOM (Fetch API, async/await) e gerenciamento de estado local com localStorage.
* API Externa: Open-Meteo Geocoding e Forecast API.

---

## Como Executar o Projeto

Como este é um projeto construído puramente com tecnologias front-end nativas, você não precisa instalar dependências pesadas ou servidores Node.js. 

1. Clone o repositório:
   ```bash
   git clone [https://github.com/seu-usuario/Weather.git](https://github.com/seu-usuario/Weather.git)

```

2. Navegue até a pasta do projeto:
```bash
cd Weather

```


3. Abra o projeto:
* Basta dar um duplo clique no arquivo index.html (geralmente localizado na pasta raiz ou em public/).
* Ou utilize a extensão Live Server no VS Code para rodar o projeto em um servidor local (http://127.0.0.1:5500).



---

## Estrutura de Arquivos

O projeto está organizado da seguinte forma:

```text
├── public/
│   └── index.html    # Estrutura e marcação da página
└── src/
    ├── style.css     # Estilização visual e responsividade (Glassmorphism)
    └── script.js     # Lógica de integração com a API e LocalStorage

```

---

## Detalhes de Implementação Importantes

* Arredondamento de Métricas: Para manter a interface limpa e idêntica ao protótipo visual, todas as respostas numéricas da API passam por um tratamento de dados via Math.round(), eliminando casas decimais desnecessárias.
* Componentização via DOM: A criação dos elementos visuais de previsão e das linhas de favoritos é feita de forma dinâmica e segura através do JavaScript (document.createElement), evitando brechas de segurança ou quebras de strings comuns em atributos onclick injetados diretamente no HTML.

---


## Fins Educacionais

Este projeto foi desenvolvido estritamente para fins didáticos e educacionais. 

---

Feito por Luanna Alcantara

---

```

```