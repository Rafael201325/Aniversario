# Convite Missão Secreta

Convite interativo mobile-first feito somente com HTML, CSS e JavaScript Vanilla.

## Personalização

Edite apenas o arquivo `config.js`. Nele estão nome, data, horário, local, link do Google Maps, telefone, mensagem do WhatsApp, traje, observações, cor, imagem, logo e música.

O telefone deve conter código do país + DDD + número, somente dígitos. Exemplo: `5592999999999`.

Para usar uma música própria, coloque o arquivo em `assets/audio/` e informe o caminho em `musica`, por exemplo: `assets/audio/trilha.mp3`. Sem arquivo, o convite usa uma ambientação leve gerada pelo navegador.

## Executar localmente

O service worker da PWA exige HTTP. Na pasta do projeto, execute uma das opções:

```powershell
npx serve .
```

ou, se tiver Python:

```powershell
python -m http.server 8080
```

Abra o endereço exibido no terminal. Para testar no celular, use o endereço de rede informado e mantenha os dois dispositivos no mesmo Wi-Fi.

## Publicação

Publique a pasta inteira no GitHub Pages, Vercel ou outro servidor estático HTTPS. O HTTPS é necessário para instalação da PWA, compartilhamento e área de transferência em navegadores compatíveis.

## Mensagem sugerida

> 🎁 Você recebeu um convite secreto.
>
> Toque no link abaixo e descubra... 👀

## Estrutura

- `config.js`: todos os dados editáveis
- `assets/css/`: estilos e animações
- `assets/js/`: lógica da experiência
- `assets/audio/`: trilha opcional
- `assets/images/`: imagens opcionais
- `assets/icons/`: ícones da PWA
- `assets/fonts/`: fontes locais opcionais
- `manifest.json` e `service-worker.js`: instalação e funcionamento offline
