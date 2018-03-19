var app = new Vue({
    el: '#app',
    data: {
        cards: [],
        id: 0,
        currentCard: { word: '', definition: ''},
        currentState: '',
        disabled: true,

    },
    created: function() {
        this.getCards();
    },
    computed: {
        seen: function() {
            if(this.currentState == 'add' || this.currentState == 'edit') return true;
            else return false;
        }
    },
    methods: {
        getCards: function(){
            axios.get('http://104.131.167.131:3001/api/cards')
                .then(resp => {
                    this.cards = resp.data;
                    this.currentCard = { word: '', definition: ''};
                    if(this.cards.length > 0){
                        this.currentCard = this.cards[this.cards.length - 1];
                        this.id = this.cards.length - 1;
                    }
                    return true;
                })
                .catch(err => {
                    console.log(err)
                })
        },
        changeToAdd: function() {
            this.currentState = 'add';
            this.currentCard = {word: '', definition: ''};
            this.disabled = false;
        },
        changeToEdit: function() {
            this.currentState = 'edit';
            this.disabled = false;
            this.currentCard = this.cards[this.id]
        },
        deleteNotecard: function() {
            axios.delete('http://104.131.167.131:3001/api/cards/' + this.id, {
                id: this.id
            }).then(resp => {
                this.cards = resp.data;
                if(this.cards.length > 0){
                    this.currentCard = this.cards[this.cards.length - 1];
                    this.id = this.cards.length - 1;
                }
                this.getCards();
                return true;
            }).catch(err => {
                console.log(err)
            })

        },
        showNextCard: function() {
            if(this.currentState == 'add'){
                return true;
            }
            this.id = this.id + 1;
            if(this.id > this.cards.length - 1){
                this.id = 0;
            }
            this.currentCard = this.cards[this.id]
        },
        showPrevCard: function() {
            if(this.currentState == 'add'){
                return true;
            }
            this.id = this.id - 1;
            if(this.id < 0){
                this.id = this.cards.length - 1;
            }
            this.currentCard = this.cards[this.id]
        },
        addSubmit: function() {
            axios.post('http://104.131.167.131:3001/api/cards', {
                card: this.currentCard,
            }).then(resp => {
            }).catch(err => {
                console.log(err)
            })
        },
        editSubmit: function() {
            axios.put('http://104.131.167.131:3001/api/cards/' + this.id, {
                id: this.id,
                card: this.currentCard
            }).then(resp => {
            }).catch(err => {
                console.log(err)
            })
        },
        submit: function() {
            if(this.currentState == 'add') this.addSubmit();
            if(this.currentState == 'edit') this.editSubmit();
            this.disabled = true;
            this.currentState = 'home';
            this.seen();
        }


    }
});
