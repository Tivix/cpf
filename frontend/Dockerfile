FROM node:20.11.1-bullseye-slim AS base

WORKDIR /code

# disable telemetry during runtime and buildtime.
ENV NEXT_TELEMETRY_DISABLED 1

COPY package.json yarn.lock* ./
RUN yarn --frozen-lockfile

# Development image, copy all the files and run next
FROM base AS development
WORKDIR /code

RUN apt update && apt install -y wget && apt clean && rm -rf /var/lib/apt/lists/*

ENV NODE_ENV development

COPY . .

# Note: Don't expose ports here, Compose will handle that for us
CMD ["yarn", "dev"]

# Rebuild the source code only when needed
FROM base AS build
WORKDIR /code
COPY --from=base /code/node_modules ./node_modules
COPY . .

RUN yarn run build

# Production image, copy all the files and run next
FROM build AS server
WORKDIR /code

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=build /code/public ./public

# Set the correct permission for prerender cache
RUN chown nextjs:nodejs .next

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=build --chown=nextjs:nodejs /code/.next/standalone ./
COPY --from=build --chown=nextjs:nodejs /code/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000
# set hostname to localhost
ENV HOSTNAME "0.0.0.0"

# server.js is created by next build from the standalone output
# https://nextjs.org/docs/pages/api-reference/next-config-js/output
CMD ["node", "server.js"]