# Propósito do Inglês · Expo

## Briefing do projeto

Este aplicativo é a migração gradual para Expo do site educacional que está em `../src`. O objetivo é levar para Android e iOS a experiência do Propósito do Inglês: um projeto comunitário de ensino, conteúdo de apoio e jogos para praticar inglês.

Trabalhe em etapas pequenas e executáveis. Reaproveite textos, dados e regras de negócio do site quando fizer sentido, mas reconstrua a interface com componentes e estilos do React Native. Não tente converter CSS ou elementos HTML diretamente.

O aplicativo atual é local e não possui backend. Não introduza servidor, autenticação ou serviços remotos sem solicitação. O login foi deixado intencionalmente para uma etapa futura; por enquanto, a rota inicial deve continuar acessível sem conta.

## Estado atual

- Projeto configurado com Expo SDK 56 e Expo Router.
- A rota `app/index.jsx` abre a tela inicial sem login.
- A tela apresenta o projeto, indicadores, versículo bilíngue e benefícios do curso.
- O site em `../src` continua sendo a referência para conteúdo e comportamento ainda não migrados.
- As páginas, jogos, perfil, login e painel administrativo ainda precisam ser migrados.

## Identidade visual obrigatória

O aplicativo deve incorporar de forma perceptível a temática da bandeira dos Estados Unidos, conectada ao aprendizado de inglês. Use vermelho, branco e azul-marinho e inclua referências visuais reconhecíveis à bandeira, como estrelas e listras, em elementos da identidade do app e das telas. Mantenha contraste, legibilidade e equilíbrio; a bandeira deve fazer parte da linguagem visual do aplicativo, não ficar restrita a um detalhe escondido.

A tela inicial atual ainda não implementa essa temática. Inclua a identidade americana na próxima etapa de design, preservando a clareza e a missão comunitária do projeto.

## Etapas sugeridas

1. **Identidade visual:** atualizar a tela inicial com a temática da bandeira americana e definir cores e componentes reutilizáveis.
2. **Navegação e conteúdo:** adicionar as telas públicas do site, como Sobre, Conteúdo, Livros e Músicas.
3. **Jogos:** migrar primeiro o Quiz e depois Monte a Frase e Forca, adaptando as interações para toque.
4. **Conta e perfil:** adicionar login, perfil e persistência local quando solicitado; não presumir a existência de backend.
5. **Administração e revisão:** migrar o painel e garantir que os dados editados sejam os mesmos consumidos pelos jogos.
6. **Validação:** testar em Android e iOS, revisar tamanhos de tela, acessibilidade e funcionamento offline.

## Diretrizes para próximas etapas

- Mantenha a versão web fora do escopo de edição, salvo pedido explícito.
- Preserve as regras e os dados existentes, verificando a origem compartilhada entre painel e jogos antes de migrá-los.
- Prefira APIs compatíveis com Expo e React Native; não dependa de `localStorage`, DOM ou eventos exclusivos do navegador.
- Mantenha o projeto fácil de importar e executar no Snack Expo Dev: concentre nele todos os arquivos necessários, use dependências compatíveis com Expo Go e SDK 56, e evite módulos nativos personalizados ou configurações dependentes desta máquina. Quando possível, valide cada etapa também no Snack.
- Faça uma etapa por vez e valide a tela ou fluxo alterado antes de avançar.
- Não adicione backend, login ou funcionalidades além da etapa solicitada.

## Requisitos

- Node.js 20.19 ou superior
- npm

## Executar

```bash
npm install
npm start
```

Abra o QR code com Expo Go. No terminal, use `a` para Android, `i` para iOS em macOS ou `w` para web.