+ Git操作命令

~~~
git config --global user.name "obullxl"
git config --global user.email obullxl@163.com
git commit --amend --reset-author


git remote -v
git remote rm destination
git remote add origin https://github.com/obullxl/ntopic.git


git commit -m 'INIT'
git push -u origin master
~~~

+ 忽略本地修改

~~~
git checkout .
~~~

~~~
git fetch --all
git reset --hard origin/master
~~~

