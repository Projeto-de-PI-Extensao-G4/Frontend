# Cris Utilidades — Front-end

App web mobile-first de gestão comercial (clientes, produtos, vendas parceladas e extrato),
feito em React + Vite. As telas seguem o Figma do projeto (frame `wireframe`).

## Rodar no computador

Precisa do [Node.js](https://nodejs.org) instalado.

```bash
npm install     # só na primeira vez
npm run dev
```

Abra **http://localhost:5173**. Para ver como no celular: F12 e depois Ctrl+Shift+M
(modo dispositivo).

## Abrir no celular (iPhone ou Android)

O celular abre o app que está rodando no seu computador, pelo Wi-Fi — não precisa instalar
nada no celular.

1. Deixe o computador e o celular **no mesmo Wi-Fi**.
2. No computador, rode o servidor aberto para a rede:

   ```bash
   npm run dev -- --host
   ```

3. O terminal mostra os endereços. Use o da linha **Network** do Wi-Fi, algo como:

   ```
   ➜  Network: http://192.168.15.12:5173/
   ```

4. No celular, abra esse endereço no navegador (Safari no iPhone, Chrome no Android).
5. Opcional, para abrir em tela cheia como um app: no Safari, **Compartilhar → Adicionar à
   Tela de Início**.

O número do endereço (`192.168.x.x`) é o IP do computador na rede e pode mudar de uma rede
para outra — sempre use o que o terminal mostrar. Também dá para ver com `ipconfig` no
Windows, em "Endereço IPv4" do adaptador Wi-Fi.

**Se não abrir no celular:**
- O Firewall do Windows pode estar bloqueando. No aviso do Windows sobre o Node.js, clique em
  **Permitir acesso** e marque **Redes privadas**.
- Nas configurações de rede do Windows, o Wi-Fi precisa estar como **Rede privada**, não
  "Pública".
- O computador precisa continuar ligado com o `npm run dev` rodando enquanto você usa.

**Limitação desse modo:** o endereço é `http`, e o navegador só libera o compartilhamento
nativo (enviar o PDF direto para o WhatsApp) e o "Copiar texto" em `https`. Nesse teste, o
botão **Enviar PDF** abre o PDF para visualizar; dali dá para compartilhar pelo próprio
navegador.

## Outros comandos

| Comando | O que faz |
|---|---|
| `npm run build` | Gera a versão final em `dist/` |
| `npm run preview` | Serve a versão de `dist/` para conferir antes de publicar |
| `npm run lint` | Confere o código com o ESLint |

## Organização

- `src/pages/` — uma pasta por tela (`.jsx` + `.module.css`).
- `src/components/` — componentes compartilhados (cabeçalho, barra inferior, campos, botões,
  folha inferior, comprovante em PDF).
- `src/styles/tokens.css` — cores, medidas e fonte do Figma. Estilo em **CSS Modules**, sem
  Tailwind.
- `src/assets/` — ícones e imagens exportados do Figma e a fonte Plus Jakarta Sans.

As telas ainda usam dados de exemplo; a ligação com a API do backend vem depois.
