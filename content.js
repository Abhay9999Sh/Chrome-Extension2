(() => {
    let likeC = 0, commentC = 0;

    chrome.runtime.sendMessage({
        data: "DataFetched Successfully"
    }, function (response) {
        likeC = Math.min(parseInt(response.data), 6);
        commentC = Math.min(parseInt(response.data1), 6);
    });

    let likesIndices = [];
    let commentsIndices = [];
    let likeProcessed = 0;
    let commentProcessed = 0;
    let allPosts = [];

    function getRandomIndex(limit, usedIndices) {
        let i = Math.floor(Math.random() * limit);
        while (usedIndices.includes(i)) {
            i = Math.floor(Math.random() * limit);
        }
        return i;
    }

    function changehere() {
        allPosts = document.querySelectorAll("#fie-impression-container");

        if (allPosts.length > 0) {
            const totalPosts = Math.min(allPosts.length, 10);

            if (likeProcessed < likeC) {
                let randomIndex = getRandomIndex(totalPosts, likesIndices);
                likesIndices.push(randomIndex);
                let like = allPosts[randomIndex].querySelector(".react-button__trigger");
                if (like) {
                    like.click();
                    console.log("Liked post at index: " + randomIndex);
                    likeProcessed++;
                }
            }

            if (commentProcessed < commentC) {
                let randomIndex = getRandomIndex(totalPosts, commentsIndices);
                commentsIndices.push(randomIndex);
                let commentBtn = allPosts[randomIndex].querySelector(".comment-button");

                if (commentBtn) {
                    commentBtn.click();
                    setTimeout(() => {
                        let comment = allPosts[randomIndex].querySelector(".ql-editor");
                        if (comment) {
                            comment.innerHTML = "CFBR";
                            let postBtn = allPosts[randomIndex].querySelector(".comments-comment-box__submit-button--cr");
                            if (postBtn) {
                                postBtn.click();
                                console.log("Commented on post at index: " + randomIndex);
                                commentProcessed++;
                            }
                        }
                    }, 1000);
                } 
            }
        }
    }

    let interval = setInterval(() => {
        changehere();

        if (likeProcessed >= likeC && commentProcessed >= commentC) {
            clearInterval(interval);
            console.log("All likes and comments have been processed.");
        }
    }, 4000);
})();
