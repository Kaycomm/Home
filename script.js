const NAME = "Kay";
const WELCOME_MESSAGE_TEMPLATE = ["night", "morning", "afternoon", "evening"];

const SHORTCUT_STARTER = 'tab' 
const SHORTCUT_TIMEOUT = 1500;

const MASTER_MAP = [
    {
        "groupName": "School",
        "items":[
            {"name": "Drive", "shortcutKey": "1", "url": "https://drive.google.com/drive/u/0/"},
            {"name": "WebAdvisor", "shortcutKey": "2", "url": "https://valleycollege.edu/webadvisor"},
            {"name": "Github", "shortcutKey": "3", "url": "https://github.com/"},
            {"name": "Midnight", "shortcutKey": "4", "url": "https://midnight.pub/"}
        ]
    },
    {
        "groupName": "Tools",
        "items":[
            {"name": "Email", "shortcutKey": "q", "url": "https://mail.google.com/mail/u/0/#inbox"},
            {"name": "Banking", "shortcutKey": "w", "url": "https://www.chase.com/"},
            {"name": "Fidelity", "shortcutKey": "e", "url": "ttps://www.fidelity.com/profile/"},
            {"name": "PenFed", "shortcutKey": "r", "url": "https://www.penfed.org/"}
        ]
    },
    {
        "groupName": "Media",
        "items":[
            {"name": "Youtube", "shortcutKey": "a", "url": "https://www.youtube.com/feed/subscriptions"},
            {"name": "Twitch", "shortcutKey": "s", "url": "https://www.twitch.tv/"},
            {"name": "Twitter", "shortcutKey": "d", "url": "https://www.twitter.com/home"},
            {"name": "Reddit", "shortcutKey": "f", "url": "https://www.reddit.com/"}
        ]
    },
    {
        "groupName": "Boards",
        "items":[
            {"name": "/A/", "shortcutKey": "z", "url": "https://boards.4channel.org/a/"},
            {"name": "/G/", "shortcutKey": "x", "url": "https://boards.4channel.org/g/"},
            {"name": "/VG/", "shortcutKey": "c", "url": "https://boards.4channel.org/vg/"},
            {"name": "/JP/", "shortcutKey": "v", "url": "https://boards.4channel.org/jp/"}
         ]
    }
]

let $container = document.getElementById("content");
let getUrl = {};

let $shortcutDisplayList = document.getElementsByClassName("shortcut");
let listeningForShortcut = false;
let listenerTimeout;

function setupWelcomeMessage(){
    let curHours = new Date().getHours();
    curHours = Math.floor(curHours/6); // Simply dividing current hours by 6 proves to be a good enough aproximation.
    if (curHours == 4) curHours = 3;
    let welcome = "Good " + WELCOME_MESSAGE_TEMPLATE[curHours] + " " + NAME;
    document.getElementById("welcome-string").innerHTML = welcome;
}

function setupGroups(){
    for (let i = 0; i < MASTER_MAP.length; i++){
        let curGroupData = MASTER_MAP[i];

        let group = document.createElement("div");
        group.className = "group";
        $container.appendChild(group);

        let header = document.createElement("h1");
        header.innerHTML = curGroupData.groupName;
        group.appendChild(header);

        for (let j = 0; j < curGroupData.items.length; j++){
            let curItemData = curGroupData.items[j];

            let pContainer = document.createElement("p");
            group.appendChild(pContainer);

            let link = document.createElement("a");
            link.innerHTML = curItemData.name;
            link.setAttribute("href", curItemData.url);
            pContainer.appendChild(link);

            let shortcutDisplay = document.createElement("span");
            shortcutDisplay.innerHTML = curItemData.shortcutKey;
            shortcutDisplay.className = "shortcut";
            shortcutDisplay.style.animation = "none";
            pContainer.appendChild(shortcutDisplay);

            getUrl[curItemData.shortcutKey] = curItemData.url
        }
    }
}

function shortcutListener(e) {
    let key = e.key.toLowerCase();

    if (listeningForShortcut && getUrl.hasOwnProperty(key)){
        window.location = getUrl[key];
    }

    if (key === SHORTCUT_STARTER) {
        clearTimeout(listenerTimeout);
        listeningForShortcut = true;

        // Animation reset
        for (let i = 0; i < $shortcutDisplayList.length; i++){
            $shortcutDisplayList[i].style.animation = "none";
            setTimeout(function() { $shortcutDisplayList[i].style.animation = ''; }, 10);
        }

        listenerTimeout = setTimeout(function(){ listeningForShortcut = false; }, SHORTCUT_TIMEOUT);
    }
}

function main(){
    setupWelcomeMessage();
    setupGroups();
    document.addEventListener('keyup', shortcutListener, false);
}

main();
