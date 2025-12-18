const editableElements = document.getElementById('editable_h1');
const socialMediaElements = document.getElementById('social_media_add_button');
const socialPopup = document.getElementById('socialPopup');
const mainSection_h1 = document.getElementById("main_section_h1");
const mainSectionSub = document.getElementById(("main_section_sub"));

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


function eventClict(element,endpoint,fieldName) {
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

            fetch(endpoint, {
                method: "POST", headers: {
                    "Content-Type": "application/x-www-form-urlencoded", "X-CSRFToken": tokenise,
                }, body: `${fieldName}=${encodeURIComponent(newText)}`
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



document.addEventListener("DOMContentLoaded", () => {
  const MAX_COUNT = 3;

  const items = document.querySelectorAll(".social_media_icons");
  const addButton = document.getElementById("social_media_add_button");

  if (!addButton) return;

  if (items.length >= MAX_COUNT) {
    addButton.classList.add("deactive");
    addButton.style.pointerEvents = "none";
    addButton.style.opacity = "0.4";
  }
});



const tokenise = getCookie("csrftoken");
openCloseFunction(socialPopup, socialMediaElements);
eventClict(editableElements, "/update_page/", "editable_name");
// eventClict(mainSection_h1,"/update_page/","main_section_h1");
// eventClict(mainSectionSub,"/update_page/","main_section_sub");