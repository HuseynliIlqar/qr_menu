const editableHeaderElement = document.getElementById("editable_h1");

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



const tokenise = getCookie("csrftoken");
// openCloseFunction(socialPopup, socialMediaElements);
eventClict(editableHeaderElement, "/update_page/", "editable_name");