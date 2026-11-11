# Evoluir

App pessoal de desenvolvimento — habilidades, padrões e decisões. Simples, visual, e 100% local: nenhum dado sai do seu computador.

## Como rodar

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

## Build para produção

```bash
npm run build
```

Gera os arquivos estáticos em `dist/`, que podem ser abertos localmente ou hospedados em qualquer servidor de arquivos estáticos, se um dia quiser acessar de outro lugar.
