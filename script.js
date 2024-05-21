{/* <script>
var copy = document.getElementById("copy");

function active_copy() {
    document
        .querySelectorAll("#data-box span[data-copy=true]")
        .forEach(function(elt) {
            elt.addEventListener(
                "click",
                function(e) {
                    var self = this;
                    var value = self.getAttribute("data-value");
                    copy.textContent = value;
                    copy.select();
                    if (document.execCommand("copy")) {
                        self.innerHTML = '<i class="bi bi-clipboard-check"></i>';
                        self.setAttribute("class", "btn btn-success");
                        copy.blur();
                    } else {
                        self.setAttribute("class", "btn btn-danger");
                        self.innerHTML = '<i class="bi bi-clipboard-x"></i>';
                    }
                    setTimeout(function() {
                        self.setAttribute("class", "btn btn-secondary");
                        self.innerHTML = '<i class="bi bi-clipboard"></i>';
                    }, 2000);
                },
                false
            );
        });
}

var tooltipTriggerList = [].slice.call(
    document.querySelectorAll('[data-bs-toggle="tooltip"]')
);
var tooltipList = tooltipTriggerList.map(function(tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl);
});

var popover_1 = new bootstrap.Popover(
    document.getElementById("telephone"), {
        trigger: "focus",
    }
);

var popover_2 = new bootstrap.Popover(document.getElementById("amount"), {
    trigger: "focus",
});

var popover_3 = new bootstrap.Popover(
    document.getElementById("percent-start"), {
        trigger: "focus",
    }
);

var popover_4 = new bootstrap.Popover(
    document.getElementById("percent-end"), {
        trigger: "focus",
    }
);

var popover_5 = new bootstrap.Popover(
    document.getElementById("update-percent-start"), {
        trigger: "focus",
    }
);

var popover_6 = new bootstrap.Popover(
    document.getElementById("update-percent-end"), {
        trigger: "focus",
    }
);

var modal = new bootstrap.Modal(document.getElementById("modal"), {
    keyboard: false,
});

var dataBox = new bootstrap.Modal(document.getElementById("data-box"), {
    keyboard: false,
});

function showModal(content, status = "error") {
    if (status == "success") {
        document
            .querySelector(".modal-header")
            .setAttribute("style", "background-color:#198754;");
        document.querySelector(".modal-title").innerHTML =
            '<i class="fi fi-br-comment-info"></i> Info';
    } else {
        document
            .querySelector(".modal-header")
            .setAttribute("style", "background-color:#e04f5f;");
        document.querySelector(".modal-title").innerHTML =
            '<i class="fi fi-rr-sensor-alert"></i> Alert';
    }
    document
        .querySelector(".modal-title")
        .setAttribute("style", "color:white");
    document.querySelector(".modal-body > p").innerHTML = content;
    modal.show();
}

document.querySelector(".tool-info span").onclick = function(evt) {
    document.querySelector("#data-box .modal-title").innerText =
        "Utilité et Fonctionnement";
    document.querySelector("#data-box .modal-body > p").innerHTML =
        document.querySelector(".tool-info-data").innerHTML;
    dataBox.show();
};

document.querySelectorAll(".history-item").forEach(function(elt) {
    elt.onclick = function(evt) {
        document.querySelector("#data-box .modal-title").innerText =
            "Détails de l'accès client";
        document.querySelector("#data-box .modal-body > p").innerHTML =
            this.querySelector(".h-data").innerHTML;
        dataBox.show();
        setTimeout(function() {
            active_copy();
        }, 1000);
    };
});

document.getElementById("alert-sms").onchange = function(evt) {
    this.toggleAttribute("checked");

    if (this.hasAttribute("checked")) {
        this.value = "on";
        document.getElementById("create-access").innerHTML =
            'Créer l\'accès client (5000 Crédits) <i class="bi bi-arrow-right-short"></i>';
    } else {
        this.value = "off";
        document.getElementById("create-access").innerHTML =
            'Créer l\'accès client (4000 Crédits) <i class="bi bi-arrow-right-short"></i>';
    }
};

document.getElementById("telephone").onblur = function() {
    var telephone = this.value.replace(/[ )(-]/g, "");
    this.value = telephone;
};

document.getElementById("create-access").onclick = function(evt) {
    evt.preventDefault();

    var tel = document.getElementById("telephone").value;

    if (new RegExp(/\+[0-9 .-]{8,}/).test(tel) == false) {
        showModal(
            "Veuillez saisir le numéro de téléphone du client au format international. Ex: +XXXXXXXXXX"
        );
        return;
    }

    if (document.getElementById("email").checkValidity() == false) {
        showModal(
            "Adresse e-mail invalide. Une adresse e-mail ne doit pas contenir des caractères accentués."
        );
        return;
    }

    if (!document.getElementById("form-create").checkValidity()) {
        showModal(
            "Tous les champs du formulaire sont requis et doivent être valides."
        );
        return;
    }

    var self = this;
    self.setAttribute("disabled", "disabled");

    setTimeout(() => {
        document
            .getElementById("account")
            .setAttribute("style", "-webkit-filter:blur(3px);filter:blur(3px)");
        document
            .getElementById("loading")
            .setAttribute("style", "visibility:visible;opacity:1");
    }, 200);

    var data = new FormData(document.getElementById("form-create"));

    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/account/tools/flash-account/?check-formdata=true");
    xhr.send(data);
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var res = xhr.response.split("|");
            if (res[0] == "SUCCESS") {
                document.getElementById("form-create").submit();
            } else {
                setTimeout(() => {
                    showModal(res[1]);
                }, 300);
            }
            document.getElementById("account").removeAttribute("style");
            document.getElementById("loading").removeAttribute("style");
            self.removeAttribute("disabled");
        }
    };
};

document.getElementById("access-cl").onchange = function(evt) {
    var update_data = document.querySelector("#update-data");

    update_data.innerHTML =
        '<option value="update-pp-msg" selected>Modifier les pourcentages et le message à affiché</option><option value="update-codepin">Changer le code pin de connexion du compte client</option>';

    var val = this.querySelector(
        'option[value="' + this.value + '"]'
    ).innerText.split("-")[0];

    document.getElementById("update-percent-start").value = "";
    document.getElementById("update-percent-end").value = "";
    document.getElementById("update-message-vr").value = "";
    document.querySelector("#show-cl-access b").innerHTML = val;
    document.querySelector("#show-update-percent-start b").innerHTML = "N/A";
    document.querySelector("#show-update-percent-end b").innerHTML = "N/A";
    document.querySelector("#show-update-message-vr b").innerHTML = "N/A";

    var id_account = document.querySelector("#access-cl").value;

    var xhr = new XMLHttpRequest();

    xhr.open(
        "GET",
        "/account/tools/flash-account/?update-action=true&id_account=" +
        id_account
    );
    xhr.send(null);

    xhr.onreadystatechange = function() {
        if (xhr.readyState != 4) return;

        if (xhr.status == 200) {
            var res = xhr.response.split("|");

            if (res[0] == "FOUND") {
                if (res[1]) {
                    update_data.innerHTML =
                        '<option value="update-codepin">Changer le code pin de connexion du compte client</option><option value="update-pp-msg" selected>Modifier les pourcentages et le message à affiché</option>';
                }

                if (res[1] == "ADD-AMOUNT") {
                    update_data.innerHTML =
                        '<option value="add-amount">Ajouter de l\'argent au solde actuel du compte client</option><option value="update-codepin">Changer le code PIN de connexion du compte client</option><option value="update-pp-msg" selected>Modifier les pourcentages et le message à affiché</option>';
                }

                if (res[1] == "FULL-OPTION") {
                    update_data.innerHTML =
                        '<option value="add-amount">Ajouter de l\'argent au solde actuel du compte client</option><option value="update-codepin">Changer le code PIN de connexion du compte client</option><option value="update-date">Mettre à jour la date de création du compte client</option> <option value="update-amount">Modifier le solde disponible sur le compte client</option><option value="update-pp-msg" selected>Modifier les pourcentages et le message à affiché</option>';
                }
            } else {
                update_data.innerHTML =
                    '<option value="update-pp-msg" selected disabled>Modifier les pourcentages et le message à affiché</option>';
            }

            setTimeout(function() {
                update_data.removeAttribute("disabled");
            }, 200);
        }
    };
};

document.querySelector("#update-data").onchange = function() {
    var val = this.value;

    if (val != "update-pp-msg") {
        document
            .querySelector(".update-pp-msg")
            .setAttribute("style", "display:none");

        setTimeout(function() {
            var id_account = document.querySelector("#access-cl").value;

            switch (val) {
                case "update-codepin":
                    if (
                        confirm(
                            "Confirmez-vous la mise à jour du code pin de connexion du compte client *" +
                            document
                            .querySelector("#show-cl-access b")
                            .innerText.trim() +
                            "* ?"
                        )
                    ) {
                        location.href =
                            "/account/tools/flash-account/?update-acc=codepin&id_account=" +
                            id_account;
                    }
                    break;
                case "add-amount":
                    var currency = document
                        .querySelector(
                            '#access-cl option[value="' +
                            document.getElementById("access-cl").value +
                            '"]'
                        )
                        .getAttribute("data-currency");

                    var add_amount = prompt(
                        "Veuillez saisir le montant à ajouté au solde actuel du compte client *" +
                        document.querySelector("#show-cl-access b").innerText.trim() +
                        "* en " +
                        currency +
                        " :"
                    );

                    setTimeout(function() {
                        if (add_amount) {
                            var split_amount = add_amount.split("");
                            add_amount = "";

                            for (var i = 0; i < split_amount.length; i++) {
                                if (new RegExp(/[0-9., ]{1}/).test(split_amount[i])) {
                                    if (split_amount[i] == "." || split_amount[i] == ",") {
                                        add_amount += ".";
                                    } else if (split_amount[i] != " ") {
                                        add_amount += split_amount[i];
                                    }
                                }
                            }

                            if (
                                confirm(
                                    add_amount +
                                    " " +
                                    currency +
                                    " seront ajouté(s) au solde actuel du compte client *" +
                                    document
                                    .querySelector("#show-cl-access b")
                                    .innerText.trim() +
                                    "*"
                                ) &&
                                parseInt(add_amount) > 0
                            ) {
                                location.href =
                                    "/account/tools/flash-account/?update-acc=add-amount&id_account=" +
                                    id_account +
                                    "&amount=" +
                                    add_amount;
                            }
                        }
                    }, 1000);
                    break;
                case "update-amount":
                    var currency = document
                        .querySelector(
                            '#access-cl option[value="' +
                            document.getElementById("access-cl").value +
                            '"]'
                        )
                        .getAttribute("data-currency");

                    var update_amount = prompt(
                        "Veuillez saisir le nouveau solde que vous souhaitez sur le compte du client *" +
                        document.querySelector("#show-cl-access b").innerText.trim() +
                        "* en " +
                        currency +
                        " :"
                    );

                    setTimeout(function() {
                        if (update_amount) {
                            var split_amount = update_amount.split("");
                            update_amount = "";

                            for (var i = 0; i < split_amount.length; i++) {
                                if (new RegExp(/[0-9., ]{1}/).test(split_amount[i])) {
                                    if (split_amount[i] == "." || split_amount[i] == ",") {
                                        update_amount += ".";
                                    } else if (split_amount[i] != " ") {
                                        update_amount += split_amount[i];
                                    }
                                }
                            }

                            if (
                                confirm(
                                    update_amount +
                                    " " +
                                    currency +
                                    " serait le nouveau solde du compte client *" +
                                    document
                                    .querySelector("#show-cl-access b")
                                    .innerText.trim() +
                                    "*"
                                ) &&
                                parseInt(update_amount) > 0
                            ) {
                                location.href =
                                    "/account/tools/flash-account/?update-acc=update-amount&id_account=" +
                                    id_account +
                                    "&amount=" +
                                    update_amount;
                            }
                        }
                    }, 1000);

                    break;

                case "update-date":
                    if (
                        confirm(
                            "Confirmez-vous la mise à jour de la date de création du compte client *" +
                            document
                            .querySelector("#show-cl-access b")
                            .innerText.trim() +
                            "* à la date d'aujourd'hui ?"
                        )
                    ) {
                        location.href =
                            "/account/tools/flash-account/?update-acc=date&id_account=" +
                            id_account;
                    }
                    break;
            }
        }, 1000);
    } else {
        document.querySelector(".update-pp-msg").removeAttribute("style");
    }
};

document.getElementById("update-percent-start").onkeyup = function(evt) {
    var val = this.value;
    if (val.length == 0)
        document.querySelector("#show-update-percent-start b").innerHTML =
        "N/A";
    else
        document.querySelector("#show-update-percent-start b").innerHTML =
        val + "%";
};
document.getElementById("update-percent-start").onblur = function() {
    var event = new Event("keyup");
    this.dispatchEvent(event);
};

document.getElementById("update-percent-end").onkeyup = function(evt) {
    var val = this.value;
    if (val.length == 0)
        document.querySelector("#show-update-percent-end b").innerHTML = "N/A";
    else
        document.querySelector("#show-update-percent-end b").innerHTML =
        val + "%";
};
document.getElementById("update-percent-end").onblur = function() {
    var event = new Event("keyup");
    this.dispatchEvent(event);
};

document.getElementById("update-message-vr").onkeyup = function(evt) {
    var val = this.value;
    if (val.length == 0)
        document.querySelector("#show-update-message-vr b").innerHTML = "N/A";
    else document.querySelector("#show-update-message-vr b").innerHTML = val;
};
document.getElementById("update-message-vr").onblur = function() {
    var event = new Event("keyup");
    this.dispatchEvent(event);
};

window.onload = function() {
    var toggleMenu = document.getElementById("toggleMenu");
    var menu = document.getElementById("menu");
    var content = document.getElementById("content");
    var logout =
        document.querySelector("header nav a[title=Déconnexion]") || false;

    toggleMenu.onclick = function(evt) {
        evt.preventDefault();
        if (matchMedia("(max-width:1000px)").matches) {
            if (menu.hasAttribute("style")) {
                menu.removeAttribute("style");
                menu.removeAttribute("data-mob");
                content.removeAttribute("style");
                this.querySelector("img").src = "/res/img/menu.png";
            } else {
                menu.setAttribute("style", "left:0px");
                menu.setAttribute("data-mob", "true");
                content.setAttribute(
                    "style",
                    "-webkit-filter:blur(3px);filter:blur(3px)"
                );
                this.querySelector("img").src = "/res/img/delete.png";
            }
        } else {
            if (menu.hasAttribute("style")) {
                menu.removeAttribute("style");
                content.removeAttribute("style");
            } else {
                menu.setAttribute("style", "left:-280px");
                content.setAttribute("style", "left:0;width:100% !important");
            }
        }
    };

    if (logout != false) {
        logout.onclick = function(evt) {
            evt.preventDefault();
            if (
                confirm(
                    "Vous serez déconnecter de votre compte KITSCMS. Confirmez l'action ?"
                )
            ) {
                location.href = "/account/?logout=true";
            }
        };
    }

    if (matchMedia("(max-width:1000px)").matches) {
        document.getElementById("content").onclick = function(evt) {
            if (menu.hasAttribute("data-mob")) {
                toggleMenu.click();
            }
        };
    }
};
var deleteLink = document.querySelectorAll(".delete-link");

if (deleteLink.length > 0) {
    deleteLink.forEach(function(elt) {
        elt.onclick = function(evt) {
            evt.preventDefault();
            var text = this.getAttribute("data-alert");
            if (confirm(text)) {
                location.href = this.getAttribute("href");
            }
        };
    });
}

function delete_history(event) {
    var self = event.target;
    event.preventDefault();
    var text = self.getAttribute("data-alert");
    if (confirm(text)) {
        location.href = self.getAttribute("href");
    }
}

var go = document.querySelector("html");
</script> */}