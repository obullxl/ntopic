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

+ 存储用户名和密码

~~~
git config --global credential.helper store
~~~

这一步会在当前用户HOME目录下的.gitconfig文件最后添加：

~~~
[credential]
   helper = store
~~~

现在push你的代码 (`git push`), 这时会让你输入用户名密码, 这一步输入的用户名密码会被记住, 下次再push代码时就不用输入用户名密码啦!

这一步会在用户HOME目录下生成文件`.git-credential`记录用户名密码的信息.
