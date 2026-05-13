FROM oven/bun:1 AS build
WORKDIR /app

COPY package.json bun.lock ./
RUN bun install --frozen-lockfile --ignore-scripts

COPY . .
RUN bun run build

FROM joseluisq/static-web-server:2
WORKDIR /public
COPY --from=build /app/dist /public
EXPOSE 80
CMD ["--root", "/public", "--host", "0.0.0.0", "--port", "80"]
