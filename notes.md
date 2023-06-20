`npx prisma migrate dev` -> to update db if anything has changed in schema
`prisma migrate deploy` -> to just deploy db if needs to be run without changes
`npm run start:server` -> runs only backend currently
`pg_ctl -D /usr/local/var//postgresql@14 start` -> start postgres if not running on mac



If getting permission denied on lock file review https://stackoverflow.com/questions/33942967/unable-to-start-postgres-server-because-of-permission-denied-on-lock-file
might need to do these as listed in that link
`sudo rm /tmp/.s.PGSQL.5432.lock`
`sudo rm /tmp/.s.PGSQL.5432`
