# -*- coding: utf-8 -*-
"""
Created on Thu Nov 16 12:42:07 2017

@author: ddowl
"""

import pip

package_name = "PyGithub"

pip.main(['install', package_name])

#Github Instance

from github import Github

#authentication code used to access dowlind1 github
g = Github('fa5a233f26308dc4cc996becb68681f9a766f01a')
user = g.get_user('dowlind1')
follower = user.get_followers() #following you
followee = user.get_following() #you follow
"""Creating list and dict"""
followerList=[]
#repoList =[] - not used yet
userList={}

#for loop to print out names of the people following me
for follower in follower:
    #print(follower.name) - used for testing
    followerList.append(followee.login) # using login instead of name because some users do not have their names on their account
    repo = followee.get_repos()
    repoList =[] #A new list created each time which will become the value(list of repos) for each key(user)
    #for loop that will go through each user repositories and print them out
    for repo in repo:
        #print(repo.name) - used for testing
        repoList.append(repo.name)
    userList[followee.login]= repoList
    
print(userList) # - prints each user and the repositories they created or have on public
        
