export default class Data{

    constructor() {
        this.requests = 0;
        this.chuck_norris_joke = 0;
        this.num_sum = 0;
        this.kanye_west_quotes = 0;

    }

    updateCount(num) {
        switch (num) {
            case 0:
                this.requests++
                break
            case 1:
                this.chuck_norris_joke++
                break
            case 2:
                this.num_sum++
                break
            case 3:
                this.kanye_west_quotes++
                break
            default:
                return undefined
        }
    }

    getRequests() {
        return this.requests
    }

    getChuck() {
        return this.chuck_norris_joke
    }

    getKanye() {
        return this.kanye_west_quotes
    }

    getSum() {
        return this.num_sum
    }
}


