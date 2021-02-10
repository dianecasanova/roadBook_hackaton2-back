Gettting started
git clone repo
cd repo
npm install

# Setup your env variables

npm start # to start your dev server

Environment variables

Example
NODE_ENV=development
PORT=8000
// DATABASE_URL="mysql://user:password@host/dbRoadbook"

## How to modify the database ?

migrate: "npx prisma migrate dev --preview-feature"
npm run seed
npx prisma studio
