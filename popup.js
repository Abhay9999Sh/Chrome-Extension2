const like = document.querySelector('.likeCount');
const comment = document.querySelector('.commentCount');
const btnv = document.querySelector('.btn');
const submitBtn = document.querySelector('.submit');

function toggleButtonVisibility() {
    if (like.value !== "" && comment.value !== "") {
        btnv.classList.remove('hidden');
    } else {
        btnv.classList.add('hidden');
    }
}

like.addEventListener('keyup', toggleButtonVisibility);
comment.addEventListener('keyup', toggleButtonVisibility);

submitBtn.addEventListener('click', function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        var tab = tabs[0];
        chrome.tabs.update(tab.id, {url: 'https://www.linkedin.com/feed/'});
    });

    chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
        console.log(message);
        sendResponse({
            data: like.value,
            data1: comment.value
        });
    });
});
