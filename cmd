-- Jya4reqiJRxYbQ25
-- npm install prisma typescript tsx @types/node --save-dev
-- npx prisma init
-- npx prisma db push
-- npx prisma format
-- npx prisma migrate dev
-- npx prisma migrate reset

-- npm install @prisma/client
-- npm install pg @prisma/adapter-pg @types/pg
-- npx prisma generate
-- npm install zod

after creating the models, do the migration first then run npx prisma generate
check on the directory if the model is already added > prisma > generated > browser.ts

if you created the table directly on the host
-- npx prisma db pull
-- npx prisma generate


PROP DRILLING > PASSING STATE THROUGH COMPONENT LAYERS