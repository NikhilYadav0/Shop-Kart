# git fetch
# for branch in $(git branch -r | grep -v '\->'); do
#     git branch --track ${branch#origin/} $branch 2>/dev/null
# done

for branch in $(git branch | sed 's/\*//'); do
    git merge $branch
done