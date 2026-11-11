# Evoluir

App pessoal de desenvolvimento — habilidades, padrões e decisões. Simples, visual, e 100% local: nenhum dado sai do seu navegador.

**App publicado:** https://sanklei2003-sudo.github.io/evoluir/

No iPhone: abra o link no **Safari** → compartilhar → "Adicionar à Tela de Início", para ganhar um ícone próprio e abertura em tela cheia.

Celular e computador têm dados **separados** (cada navegador guarda o seu, localmente).

## Publicar uma atualização

Depois de mexer no código:

```bash
npm run build
npx gh-pages -d dist
```

Isso sobe o novo build para o link público acima (branch `gh-pages`). O `git push` normal (branch `main`) só versiona o código-fonte — não atualiza o site sozinho.

## Rodar localmente (opcional, para desenvolver)

```bash
npm install
npm run dev
```

Abra o endereço que aparecer no terminal (normalmente `http://localhost:5173`). Deixe esse terminal aberto enquanto estiver usando o app.

## Seus dados

Tudo fica salvo no armazenamento local do navegador (`localStorage`), neste computador, neste navegador. Não há servidor, conta ou envio de dados para fora.

Isso também significa:
- Se limpar os dados do site no navegador, as informações do app são perdidas.
- Os dados não sincronizam entre navegadores ou dispositivos diferentes.

Para fazer backup, abra o Console do navegador (F12) na página do app e rode:

```js
copy(JSON.stringify({
  skills: localStorage.getItem('evoluir:skills'),
  checkins: localStorage.getItem('evoluir:checkins'),
  decisions: localStorage.getItem('evoluir:decisions'),
}))
```

Isso copia um backup para a área de transferência — cole num arquivo de texto para guardar.
