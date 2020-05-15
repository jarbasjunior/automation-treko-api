# In the terminal,
# navigate to path "script" folder "~/automation-treko-api/api/scripts", and 
# run: "chmod +x dropdb.sh" to make this command executable
mongo --host localhost:27017 trekodb --eval "db.tasks.drop()"