# Site Dra. Kimberly Vieira

Rascunho do site, ainda sem validação da Dra. Kimberly.

## Onde está publicado

- Endereço: https://drakimberly.com.br (e www).
- Publicado no Cloudflare, conta onde está o domínio (Contato@akbw.com.br's Account), pelo Worker `drakimberly-site`, com as rotas `drakimberly.com.br/*` e `www.drakimberly.com.br/*`.
- A página `/branding-kit/` é outro Worker (`drakimberly-branding-kit`). A rota dele é mais específica e continua funcionando.
- O projeto Pages `site-dra-kimberly-vieira` na conta pessoal é a versão antiga de agosto e não está ligado ao domínio.

## Como atualizar

1. Editar `index.html`, `sobre.html`, `procedimentos.html` ou `contato.html`. Imagens ficam em `assets/images/`.
2. Rodar `node build.js` (gera `dist/`).
3. Publicar o conteúdo de `dist/` no Worker `drakimberly-site` com `wrangler deploy`, usando este `wrangler.toml`:

```toml
name = "drakimberly-site"
compatibility_date = "2026-11-01"
workers_dev = false
routes = [
  { pattern = "drakimberly.com.br/*", zone_name = "drakimberly.com.br" },
  { pattern = "www.drakimberly.com.br/*", zone_name = "drakimberly.com.br" }
]
[assets]
directory = "./dist"
html_handling = "auto-trailing-slash"
not_found_handling = "none"
```

## Pendências para validar com a Dra. Kimberly

- Foto principal: hoje é uma pessoa gerada por IA. Trocar por foto real dela.
- Logo: o site usa o monograma "KV". O logo oficial (rosto em traço) está em https://drakimberly.com.br/branding-kit/.
- Endereço no Batel, Curitiba, e WhatsApp (41) 9654 1288: confirmar.
- Textos de procedimentos, "Sobre mim" e números do topo (100% personalizado etc.): revisar.
- Antes e depois e depoimentos foram retirados em 24/11/2026 (regras do CFO). Só voltar com casos reais e dentro das normas.
- E-mail: o domínio não recebe e-mail hoje (MX nulo).
