let responses = {
    "hello": ["Hello! I am your nutritionist ! How can I help you?", "Hi there! I am your nutritionist", "Greetings!"],
    "good evening": ["Good evening! How can I assist you today?", "Evening! What can I do for you?"],
    "how are you": ["I am fine"],
    "which food have greatest impact on climate change": ["Animal based foods like red meat, dairy and farmed shrimp has greater impact as it is associated with highest greenhouse emissions"],
    "what food should i intake to reduce climate footprint": ["Consume less animal based product and shift more towards plant based product"],
    "why does meat have big climate impact": ["They have gtreater impact associated with greenhouse emission"],
    "what kind of sea food should i eat": ["Wild fish like tuna,pollock,cod,haddock have realtively less climate impact on them also mollusks like clams,oyester are also great low carbon change"],
    "i am facing a problem": ["Go ahead and introduce where are u from"],
    "i am from balasore": ["ok great go ahead and tell me what you ate and your symptoms"],
    "i am from cuttack": ["OK great! Go ahead and tell me what you ate and your your symptoms."],
    "i am from sambalpur": ["OK great! Go ahead and tell me what you ate and your symptoms."],
    "i am from dhenkanal": ["OK great! Go ahead and tell me what you ate and  your symptoms."],
    "i ate rice and groundnut and i am facing issues like vomiting, itching, swelling of face and lips": ["ok as per the data of your area i have and by the above symptoms of your last ate food i see that you are allergic to rice . I suugest you to avoid it and shift towards alternatives like Quinoa,Millet,Barley"],
    "i ate sugarcane and wheat and  i am facing issues like swelling around faces,lips and eyes": ["ok as per the data of your area i have and by the above symptoms of your last ate food i see that you are allergic to sugarcane . I suggest you to avoid it and shift towards alternatives like fruit based sweetner , honey ,coconut sugar "],
    "i ate groundnut and millets and i am facing isuues like red,swollen ,blistered skin": ["ok as per the data of your area i have i see that your area is more prone to magnesium and by the above symptoms i see that you are allergic to groundnut. I suggest you to avoid it and shift towards alternatives like pumpkin seeds, sunflower seeds"],
    

};

function getCurrentTimestamp() {
    return new Date();
}

function renderMessageToScreen(args) {
    let displayDate = (args.time || getCurrentTimestamp()).toLocaleString('en-IN', {
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
    });
    let messagesContainer = $('.messages');

    let message = $(`
        <li class="message ${args.message_side}">
            <div class="avatar"></div>
            <div class="text_wrapper">
                <div class="text">${args.text}</div>
                <div class="timestamp">${displayDate}</div>
            </div>
        </li>
    `);

    messagesContainer.append(message);

    setTimeout(function () {
        message.addClass('appeared');
    }, 0);
    messagesContainer.animate({ scrollTop: messagesContainer.prop('scrollHeight') }, 300);
}

function showUserMessage(message, datetime) {
    renderMessageToScreen({
        text: message,
        time: datetime,
        message_side: 'right',
    });
}

function showBotMessage(message, datetime) {
    renderMessageToScreen({
        text: message,
        time: datetime,
        message_side: 'left',
    });
}

$('#send_button').on('click', function (e) {
    const userMessage = $('#msg_input').val().trim().toLowerCase();

    if (userMessage !== '') {
        showUserMessage(userMessage);
        $('#msg_input').val('');

        setTimeout(function () {
            let matchedQuestion = responses[userMessage];
            if (matchedQuestion) {
                const responseArray = responses[userMessage];
                const randomIndex = Math.floor(Math.random() * responseArray.length);
                showBotMessage(responseArray[randomIndex]);
            } else {
                showBotMessage("I'm not sure about that. Ask something else.");
            }
        }, 300);
    }
});

$(window).on('load', function () {
    showBotMessage('Hello there! Type in a message.');
}); 