install.packages("gh")
library("gh")
?gh
gh("/users/dowlind1/followers")

myapp <- oauth_app(appname = "Assignment",
                   key = "6199e68ea54464745137",
                   secret = "e79ecbcec7e674422e563fa4984c6e06cb612066")
#
# # Get OAuth credentials

github_token <- oauth2.0_token(oauth_endpoints("github"), myapp)

users <- gh("/users/dowlind1/followers",.limit=50, .token = github_token )

#write.csv(filename, file="dataTest.csv")

#this will get the first 50 users on github
req <- GET("https://api.github.com/users/dowlind1/repos", limit=5, config(token = github_token))
#will check if there is an error and announce it in r
stop_for_status(req)
#content will retrieve the contents of a request, we need it as text
#concatenate will represent the data in a better way than the content output
#cat(content(req,"text"))
#?cat
#plot(0:1,0:1,type="n")
#?content


#for top 30 users
requestUsers <- GET("https://api.github.com/users", limit=30, config(token = github_token))
#will check if there is an error and announce it in r
stop_for_status(requestUsers)
jsonUsers = content(requestUsers)
jsonUsers
usersDF = jsonlite::fromJSON(jsonlite::toJSON(jsonUsers))
users <- usersDF$login
userVector=c()
for(i in 1:length(users)){
  userVector[i]=usersDF$login[[i]]
  print(usersDF$login[[i]])
}
userVector


#for repos
requestRepos <- GET("https://api.github.com/users/dowlind1/repos", limit=50, config(token = github_token))
#will check if there is an error and announce it in r
stop_for_status(requestRepos)
jsonRepos = content(requestRepos)
jsonRepos
reposDF = jsonlite::fromJSON(jsonlite::toJSON(jsonRepos))
repos <- reposDF$name
repoVector=c()
for(i in 1:length(repos)){
  repoVector[i]=reposDF$name[[i]]
  print(reposDF$name[[i]])
}
repoVector

#user followers
requestUF <- GET("https://api.github.com/users/dowlind1/followers", limit=500, config(token = github_token))#make sure to have users when putting in a user login id beside it
#will check if there is an error and announce it in r
stop_for_status(requestUF)
jsonUF = content(requestUF)
jsonUF
usersFDF = jsonlite::fromJSON(jsonlite::toJSON(jsonUF))
usersF <- usersFDF$followers
userFVector=c()
for(i in 1:length(usersF)){
  userFVector[i]=usersFDF$login[[i]]
  print(usersFDF$login[[i]])
}
userFVector


