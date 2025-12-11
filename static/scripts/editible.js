const editableElements = document.getElementById('editable_h1');
const socialMediaElements = document.getElementById('social_media_add_button');
const socialPopup = document.getElementById('socialPopup');
const socialMediaPopupSubmitButton = document.getElementById('social_media_submit_button');


// const tokenise = document.getElementsByName("csrfmiddlewaretoken")[0].value;


function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== "") {
        const cookies = document.cookie.split(";");
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + "=")) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}


function eventClict(element) {
    element.addEventListener('click', function () {
        console.log("DEBUG for click");
        element.contentEditable = true;
    });

    document.addEventListener("keydown", function (button) {
        if (button.key === "Enter" && element.isContentEditable) {
            console.log("DEBUG for click enter");
            button.preventDefault();
            element.contentEditable = false;

            const newText = element.innerText.trim();

            fetch("update_page/", {
                method: "POST", headers: {
                    "Content-Type": "application/x-www-form-urlencoded", "X-CSRFToken": tokenise,
                }, body: "editable_name=" + encodeURIComponent(newText)
            }).then(response => {
                if (response.ok) {
                    console.log("Update successful");
                } else {
                    console.error("Update failed");
                }
            }).catch(error => {
                console.error("Error:", error);
            });
        }
    });
}

function openCloseFunction(popupElement, triggerElement) {
    triggerElement.addEventListener("click", () => {
        popupElement.classList.toggle("deactive");
    });
}


function addSocialMediaIconsDatabase(element, trigger, limit) {
    trigger.addEventListener("click", function (event) {
        event.preventDefault();

        const element_query = element.querySelectorAll("input")
        const data = {}

        element_query.forEach(input => {
            const key = input.name;
            const value = input.value.trim();
            data[key] = value;
        });
        console.log("Toplanan data:", data);
    });
}


addSocialMediaIconsDatabase(socialPopup,socialMediaPopupSubmitButton,2);
const tokenise = getCookie("csrftoken");
openCloseFunction(socialPopup, socialMediaElements);
eventClict(editableElements);
