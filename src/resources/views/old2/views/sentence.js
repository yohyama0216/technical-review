new Vue({
    el: '#sentence',
    data: {
        state: 'ready',
        results: [],
        index: 0,
        sentenceList: sentenceList,
        displaySentenceEn: false 
    },
    methods: {
        getHeaderText: function (e) {
            if (this.state == 'ready') {
                return '学習準備';
            } else if (this.state == 'now') {
                return '学習中';
            } else if (this.state == 'end') {
                return '学習終了';
            }
        },
        changeState: function (state) {
            this.state = state
        },
        setResult: function(sentence_id,point) {
            this.displaySentenceEn = false
            this.results.push({
                'sentence_id' : sentence_id,
                'user_id' : 1,
                'learn_point' : point
            })
            console.log(this.results)
            this.index++
            if (this.index == sentenceList.length) {
                this.loading = true
                axios.post('/api/learn-history', {'results' : this.results})
                    .then(response => {
                        console.log(response)
                    })
                    .catch(errors => {
                        console.log(errors)
                        alert("※保存が出来ませんでした。")
                    })
                this.changeState('end')
            }
        },
        showSentenceEn: function() {
            this.displaySentenceEn = !this.displaySentenceEn
        }
    },

})