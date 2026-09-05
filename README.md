# Robinzone — Thumbnail Generator

Вёрстка двух макетов из Figma ([Web](https://www.figma.com/design/pwU8Di7ndjFhiBNNjz2wzP/Onlyapps?node-id=14-2) и
[Mobile](https://www.figma.com/design/pwU8Di7ndjFhiBNNjz2wzP/Onlyapps?node-id=14-331)) как одна адаптивная страница.

## Стек

React 19 + TypeScript + Vite, стили — обычный CSS с токенами в `src/styles/tokens.css`.
Breakpoint между десктопным и мобильным макетом — `1024px`.

## Разработка

```bash
npm install
npm run dev      # дев-сервер
npm run build    # прод-сборка в dist/
npm run preview  # локальный просмотр сборки
```

## Структура

```
src/
  components/     # Header, Hero, GeneratorCard, PreviewCard, TrustedBy, Showcase
  styles/         # tokens.css + global.css (общие примитивы: .eyebrow, .btn-lime, ...)
  assets/         # экспортированные из Figma картинки и иконки
```

## Деплой

Пуш в `main` запускает `.github/workflows/deploy.yml`, который собирает проект и
публикует его на GitHub Pages: https://mrdoker1.github.io/only-apps-test/

`base` в `vite.config.ts` завязан на имя репозитория — при переименовании его надо поправить.

## Отличия от макетов

- Секция «Viral Videos. Perfect Images.» в мобильном макете не нарисована. Она сохранена
  и на мобильных, карточки складываются в колонку.
- В мобильном макете нет навигационного меню — в шапке остаются только логотип и «Sign In».
