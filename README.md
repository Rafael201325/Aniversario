# Convite Missão Secreta

Experiência interativa mobile-first para envio de convites personalizados por link, desenvolvida com HTML, CSS e JavaScript Vanilla.

## Destaques

- experiência responsiva para celular;
- animações e ambientação visual;
- contagem regressiva;
- confirmação por WhatsApp;
- acesso ao local pelo Google Maps;
- personalização centralizada em um único arquivo;
- publicação como site estático.

## Tecnologias

- HTML5
- CSS3
- JavaScript Vanilla
- Web APIs
- GitHub Pages

## Personalização

Todas as informações editáveis ficam em `config.js`:

```javascript
window.INVITE_CONFIG = {
  nome: "Convidado",
  data: "10 de dezembro de 2026",
  horario: "19:00",
  local: "Local do evento",
  googleMaps: "https://maps.google.com/",
  telefone: "5592999999999",
  mensagemWhatsApp: "Confirmo minha presença!"
};
```

Não publique números de telefone, endereços ou informações pessoais reais em um repositório público.

## Executar localmente

```bash
npx serve .
```

ou:

```bash
python -m http.server 8080
```

## Estrutura

```text
assets/
├── audio/
├── css/
├── fonts/
├── icons/
├── images/
└── js/
config.js
index.html
README.md
```

## Publicação

Por ser um projeto estático, pode ser publicado no GitHub Pages, Vercel, Netlify ou qualquer servidor HTTPS.

## Possibilidades de teste

- responsividade em diferentes dispositivos;
- navegação por teclado;
- acessibilidade;
- validação dos links externos;
- comportamento da contagem regressiva;
- geração da mensagem de confirmação;
- cenários com configurações ausentes ou inválidas.

## Autor

**Rafael Siqueira**  
QA Engineer | Test Automation | Front-end Quality
