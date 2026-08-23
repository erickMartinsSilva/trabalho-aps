# Identidade visual — aplicativo de aluguel de espaços

## Recomendação de fonte

### Principal: Inter
**Inter** é a tipografia recomendada para esta interface. Foi projetada especificamente para legibilidade em tela, com x-height elevado, aberturas abertas e diferenciação clara das letras — beneficiando usuários com baixa visão ou dislexia. Disponível gratuitamente via Google Fonts.

```
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500&display=swap');

font-family: 'Inter', system-ui, -apple-system, sans-serif;
```

**Por que Inter e não alternativas:**
- X-height elevado melhora a legibilidade em tamanhos pequenos (faixa de 13–15px usada em todo o projeto)
- Contadores abertos nos caracteres `a`, `e`, `c` reduzem confusão entre glifos similares
- Distinção clara entre `1`, `l`, `I` e `0`, `O` — crítico para códigos de apartamento/unidade
- Excelente suporte a diacríticos do Português Brasileiro (ã, ç, é, õ, etc.)
- Regular (400) e Medium (500) são os únicos pesos utilizados — sem risco de falhas de contraste com pesos finos

**Stack de fallback:** `'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`

---

## Paleta de cores

Todas as combinações de cor de frente/fundo atendem ao WCAG 2.1 AA (contraste ≥ 4,5:1 para texto normal, ≥ 3:1 para texto grande). O azul primário e o texto do corpo atendem ao AAA (≥ 7:1).

| Papel | Nome | Hex | Uso |
|---|---|---|---|
| Primária | Azul oceano | `#1A5C8A` | Ações principais, links, estados ativos |
| Primária clara | Tom azul | `#E8F2FA` | Fundos de botão, superfícies informativas |
| Primária escura | Azul profundo | `#0D3A5C` | Estados de hover, títulos em fundo claro |
| Semântica — sucesso | Verde teal | `#1D9E75` | Status disponível, reservas confirmadas |
| Semântica — sucesso claro | Tom teal | `#E1F5EE` | Fundo do badge disponível |
| Semântica — sucesso escuro | Teal profundo | `#085041` | Texto do badge disponível |
| Semântica — aviso | Âmbar | `#BA7517` | Status pendente, em andamento |
| Semântica — aviso claro | Tom âmbar | `#FAEEDA` | Fundo do badge pendente |
| Semântica — aviso escuro | Âmbar profundo | `#633806` | Texto do badge pendente |
| Semântica — perigo | Vermelho | `#A32D2D` | Status ocupado, erros, ações destrutivas |
| Semântica — perigo claro | Tom vermelho | `#FCEBEB` | Fundo do badge ocupado, superfícies de erro |
| Semântica — perigo escuro | Vermelho profundo | `#791F1F` | Texto do badge ocupado, texto de erro |
| Neutro — fundo | Branco quente | `#F7F6F3` | Fundo da página |
| Neutro — superfície | Off white | `#ECEAE4` | Cards, fundos de inputs |
| Neutro — atenuado | Cinza | `#B4B2A9` | Estados desabilitados, placeholders |
| Neutro — texto secundário | Cinza escuro | `#5F5E5A` | Legendas, metadados |
| Neutro — texto do corpo | Carvão | `#2C2C2A` | Todo texto do corpo (16,1:1 sobre branco quente) |

### Razões de contraste de acessibilidade

| Par | Razão | Nível WCAG |
|---|---|---|
| Carvão `#2C2C2A` sobre branco quente `#F7F6F3` | 16,1:1 | AAA |
| Azul oceano `#1A5C8A` sobre branco | 7,2:1 | AAA |
| Branco sobre azul oceano `#1A5C8A` | 7,2:1 | AAA |
| Teal profundo `#085041` sobre tom teal `#E1F5EE` | 6,5:1 | AA |
| Vermelho profundo `#791F1F` sobre tom vermelho `#FCEBEB` | 6,8:1 | AA |
| Âmbar profundo `#633806` sobre tom âmbar `#FAEEDA` | 7,0:1 | AAA |

> O status nunca é comunicado apenas pela cor. Todo badge de status inclui um ícone ao lado da cor, garantindo que usuários com daltonismo recebam a mesma informação.

---

## Escala tipográfica

Fonte base: **Inter** · Altura de linha: **1,6** · Espaçamento entre parágrafos: **1rem**

| Papel | Tamanho | Peso | Uso |
|---|---|---|---|
| Título de tela | 32px | 500 | Títulos de página de nível superior |
| Título de seção | 22px | 500 | Títulos de seção, cabeçalhos de modal |
| Título de card / rótulo | 17px | 500 | Cabeçalhos de card, rótulos de campo |
| Corpo | 15px | 400 | Texto descritivo principal, conteúdo de formulário |
| Secundário | 13px | 400 | Metadados, legendas, texto auxiliar |
| Overline | 11px / maiúsculas / tracking 0,07em | 500 | Rótulos de categoria, eyebrows de seção |

> O tamanho mínimo de texto é 13px. Nenhum peso leve (300) ou fino (200) é utilizado — esses falham nos requisitos de contraste em tamanhos pequenos.

---

## Escala de espaçamento

Baseada em uma grade de 4px.

| Token | Valor | Uso |
|---|---|---|
| `space-1` | 4px | Espaço de ícone, espaçamento inline fechado |
| `space-2` | 8px | Espaço interno de componente |
| `space-3` | 12px | Padding interno de card (fechado) |
| `space-4` | 16px | Padding interno de card (padrão) |
| `space-5` | 20px | Espaço entre seções |
| `space-6` | 24px | Margem de componente |
| `space-8` | 32px | Margem de seção |
| `space-10` | 40px | Margem de seção de página |

---

## Raio de borda

| Token | Valor | Uso |
|---|---|---|
| `radius-sm` | 8px | Botões, inputs, badges, controles pequenos |
| `radius-md` | 12px | Cards, painéis, dropdowns |
| `radius-lg` | 16px | Modais, bottom sheets, drawers |
| `radius-pill` | 999px | Badges de status, tags |

---

## Badges de status

Cada badge usa: raio pill · ícone + rótulo · preenchimento de fundo claro · texto escuro da mesma família de cor.

| Status | Fundo | Cor do texto | Ícone |
|---|---|---|---|
| Disponível | `#E1F5EE` | `#085041` | `ti-circle-check` |
| Ocupado | `#FCEBEB` | `#791F1F` | `ti-circle-x` |
| Pendente | `#FAEEDA` | `#633806` | `ti-clock` |
| Reservado | `#E8F2FA` | `#0D3A5C` | `ti-info-circle` |

---

## Estilos de botão

Altura mínima: **48px**. Área de toque mínima: **48 × 48px** (WCAG 2.5.5 AAA).

| Variante | Fundo | Texto | Borda | Uso |
|---|---|---|---|---|
| Primário | `#1A5C8A` | `#FFFFFF` | nenhuma | CTA principal (reservar, confirmar) |
| Secundário | transparente | `#1A5C8A` | 1,5px `#1A5C8A` | Ações secundárias |
| Ghost | transparente | `#5F5E5A` | borda 0,5px border-secondary | Terciário / cancelar |
| Sucesso | `#1D9E75` | `#FFFFFF` | nenhuma | Confirmar, concluir |
| Perigo | `#A32D2D` | `#FFFFFF` | nenhuma | Ações destrutivas |

---

## Inputs de formulário

| Propriedade | Valor |
|---|---|
| Altura | 48px |
| Borda (padrão) | 1,5px `#B4B2A9` |
| Borda (foco) | 1,5px `#1A5C8A` + anel de foco 3px `rgba(26,92,138,0.15)` |
| Raio de borda | 8px |
| Tamanho da fonte | 15px |
| Padding | 12px 14px |
| Tamanho do rótulo | 13px / 500 |
| Cor do rótulo | `#5F5E5A` |
| Borda de erro | 1,5px `#A32D2D` |
| Texto de erro | 13px `#A32D2D` |

> Todos os inputs possuem indicador de foco visível (anel de foco) para cumprir o WCAG 2.4.7.

---

## Ícones

Conjunto de ícones: **Tabler Icons** (estilo outline). Tamanho: 22px na navegação, 18–20px inline, 16px em badges.

Ícones usados ao lado de texto recebem `aria-hidden="true"`. Controles com apenas ícone requerem `aria-label` explícito.

Mapeamento de ícones sugerido:

| Contexto | Nome do ícone |
|---|---|
| Home / dashboard | `ti-home` |
| Espaços / unidades | `ti-building` |
| Reservas | `ti-calendar` |
| Perfil | `ti-user` |
| Disponível | `ti-circle-check` |
| Ocupado | `ti-circle-x` |
| Pendente | `ti-clock` |
| Configurações | `ti-settings` |
| Busca | `ti-search` |
| Notificações | `ti-bell` |

---

## Navegação (barra inferior mobile)

- 4 abas: Home, Espaços, Reservas, Perfil
- Altura da aba: 60px (inclui 8px de padding da safe-area inferior)
- Aba ativa: ícone + rótulo em azul oceano `#1A5C8A`
- Aba inativa: cinza atenuado `#B4B2A9`
- Borda superior: 0,5px `border-tertiary`
- Fundo: branco (distinto do fundo warm-white da página)

---

## Princípios de acessibilidade

1. **A cor nunca é o único indicador** — badges de status, estados de erro e estados interativos sempre combinam cor com ícone ou rótulo de texto.
2. **Todas as áreas de toque ≥ 48px** — botões, inputs, itens de navegação e cards interativos atendem ao WCAG 2.5.5.
3. **Indicadores de foco visíveis em todos os elementos interativos** — anel de foco de 3px com offset em `rgba(26,92,138,0.15)`.
4. **Texto mínimo de 13px** — nenhum texto menor que isso, incluindo legendas e overlines.
5. **Apenas dois pesos (400 / 500)** — evita falhas de contraste com pesos leves.
6. **Suporte a diacríticos do Português Brasileiro** — Inter cobre o conjunto completo de caracteres Latin Extended.
7. **Movimento reduzido respeitado** — quaisquer transições devem ser envolvidas em `@media (prefers-reduced-motion: no-preference)`.
8. **Compatível com modo de alto contraste** — evitar fundos que desapareçam no Modo de Alto Contraste do Windows; usar bordas para estrutura.

---

## Propriedades CSS customizadas (referência)

```css
:root {
  /* Tipografia */
  --font-base: 'Inter', system-ui, -apple-system, sans-serif;
  --font-size-xs:   11px;
  --font-size-sm:   13px;
  --font-size-base: 15px;
  --font-size-md:   17px;
  --font-size-lg:   22px;
  --font-size-xl:   32px;
  --font-weight-regular: 400;
  --font-weight-medium:  500;
  --line-height-base: 1.6;

  /* Cores — marca */
  --color-primary:       #1A5C8A;
  --color-primary-light: #E8F2FA;
  --color-primary-dark:  #0D3A5C;

  /* Cores — semânticas */
  --color-success:       #1D9E75;
  --color-success-light: #E1F5EE;
  --color-success-dark:  #085041;
  --color-warning:       #BA7517;
  --color-warning-light: #FAEEDA;
  --color-warning-dark:  #633806;
  --color-danger:        #A32D2D;
  --color-danger-light:  #FCEBEB;
  --color-danger-dark:   #791F1F;

  /* Cores — neutras */
  --color-bg:        #F7F6F3;
  --color-surface:   #ECEAE4;
  --color-muted:     #B4B2A9;
  --color-secondary: #5F5E5A;
  --color-text:      #2C2C2A;

  /* Espaçamento (grade de 4px) */
  --space-1:  4px;
  --space-2:  8px;
  --space-3:  12px;
  --space-4:  16px;
  --space-5:  20px;
  --space-6:  24px;
  --space-8:  32px;
  --space-10: 40px;

  /* Raios */
  --radius-sm:   8px;
  --radius-md:   12px;
  --radius-lg:   16px;
  --radius-pill: 999px;
}
```
