'use strict';
const axios = require('axios');
const Promise = require('bluebird');
/**
 * Imobis api class
 */
class Imobis {
    /**
     * API Constructor
     *
     * @param {Object} config API Config
     * @param {String} config.user User
     * @param {String} config.password password
     * @param {String} config.sender Sender
     */
    constructor(config) {
        this.api = 'http://gate.imobis.ru';
        this.config = config;
    }

    /**
     * Get api path
     * @param {String} method Method file (send, status, balance)
     *
     * @return {String} path Method path
     */
    getPath(method) {
        const files = {
            send: '_getsmsd.php',
            status: '_callback.php',
            balance: '_balance.php'
        };
        if (!files[method]) {
            throw new Error('getPath - error method');
        }
        return files[method];
    }

    /**
     * Get api url
     * @param {String} method Method file (send, status, balance)
     * @param {Object} params Params
     *
     * @return {String} url API url
     */
    getUrl(method, params) {
        const path = this.getPath(method);
        let url = `${this.api}/${path}?user=${this.config.user}&password=${this.config.password}`;
        if (params) {
            Object.keys(params).forEach(v => {
                url += `&${v}=${params[v]}`;
            });
        }
        return url;
    }

    /**
     * Get message by error code
     * @param {Number} code Code number
     * @param {String} type Message type (send, status, balance)
     *
     * @return {String} message Message
     */
    getMessageByCode(code, type) {
        const codes = {
            send: {
                '-1': 'Ошибка отправки',
                '-2': 'Не достаточно средств на балансе для отправки сообщения',
                '-3': 'Неизвестный номер',
                '-4': 'Внутренняя ошибка',
                '-5': 'Неверный логин или пароль',
                '-6': 'Отсутствует номер получателя',
                '-7': 'Отсутствует текст сообщения',
                '-8': 'Отсутствует имя отправителя',
                '-9': 'Неверный формат номера получателя',
                '-10': 'Отсутствует логин',
                '-11': 'Отсутствует пароль',
                '-12': 'Неверный формат внешнего (external) Id'
            },
            status: {
                '-1': 'Запрошенный id или uid не удовлетворяет заданному формату',
                '-2': 'Сообщение с запрошенным id или uid не найдено',
                '-5': 'Неверный логин или пароль',
                '-10': 'Отсутствует логин',
                '-11': 'Отсутствует пароль'
            },
            balance: {
                '-5': 'Неверный логин или пароль',
                '-10': 'Отсутствует логин',
                '-11': 'Отсутствует пароль'
            }
        };
        if (!codes[type] || !codes[type][code]) {
            throw new Error('getMessageByCode - error method or code');
        }
        return codes[type][code];
    }

    /**
     * Get status message by code
     * @param {String} code Server status cod3
     *
     * @return {String} message Message
     */
    getStatusMessage(code) {
        const messages = {
            SENT: 'Cообщение отправлено',
            DELIVRD: 'Cообщение доставлено',
            UNDELIV: 'Cообщение не доставлено',
            EXPIRED: 'Cообщение не доставлено — истек срок жизни',
            QUEUED: 'Ошибка: сообщение принято, но не отправлено',
            PENDING: 'Ошибка: сбой при отправке сообщения',
            UNKNOWN: 'Статус неизвестен',
            ACCEPTD: 'Cообщение принято в обработку (не окончательный)',
            REJECTD: 'Cообщение отклонено шлюзом',
            SCHEDUL: 'Запланирован'
        };
        if (!messages[code]) {
            throw new Error(`getStatusMessage (${code}) - status code not found`);
        }
        return messages[code];
    }

    /**
     * Send sms
     * @param {Number} id Internal id
     * @param {Array|String} phones List of phones or single phone
     * @param {String} text Text
     * @param {String} sender Sender
     *
     * @return {Object[]} result Promise
     * @return {Number} result[].code Status code (0 - ok, < 0 - error)
     * @return {Number} result[].id Message id
     * @return {Number} result[].phone Phone number
     * @return {String} result[].message Error message text
     */
    send(id, phones, text, sender) {
        sender = sender || this.config.sender;
        if (!Array.isArray(phones)) {
            phones = [phones];
        }
        return Promise
            .mapSeries(phones.map(v => this.getUrl('send', {
                sender: sender,
                SMSText: encodeURIComponent(text),
                GSM: v
            })), (q) => axios.get(q))
            .then(r =>
                r.map((v, i) => ({
                    code: (parseInt(v.data, 10) > 0) ? 0 : v.data,
                    id: (parseInt(v.data, 10) > 0) ? v.data : 0,
                    phone: phones[i],
                    message: (parseInt(v.data, 10) > 0) ? 'Cообщение отправлено' : this.getMessageByCode(v.data, 'send')
                }))
            );
    }

    /**
     * Check SMS status
     * @param {Array|Number} ids List of sms ids or single sms id
     *
     * @return {Object[]} result Promise
     * @return {Number} result[].code Code (0 - ok, < 0 - error)
     * @return {Number} result[].id Message id
     * @return {String} return[].status Status code
     * @return {Number} result[].phone Phone number
     * @return {String} result[].message Error message text
     */
    status(ids) {
        if (!Array.isArray(ids)) {
            ids = [ids];
        }
        return Promise.mapSeries(ids.map(v => this.getUrl('status', {
            id: v
        })), (q) => axios.get(q))
            .then(r =>
                r.map((v, i) => {
                    if (parseInt(v.data, 10) < 0) {
                        return {
                            code: v.data,
                            id: ids[i],
                            message: this.getMessageByCode(v.data, 'status')
                        };
                    }
                    return {
                        code: 0,
                        id: ids[i],
                        status: v.data,
                        message: this.getStatusMessage(v.data)
                    };
                })
            );
    }

    /**
     * Get account balance
     * @return {Object} result Promise
     * @return {Number} result.code Code (0 - ok, < 0 - error)
     * @return {Number} result.balance Account balance
     * @return {String} result.message Error message
     */
    balance() {
        return axios.get(this.getUrl('balance'))
            .then(r => {
                if (parseInt(r.data, 10) < 0) {
                    return {
                        code: r.data,
                        message: this.getMessageByCode(r.data, 'balance')
                    };
                }
                return {
                    code: 0,
                    balance: r.data,
                    message: null
                };
            });
    }
}

module.exports = Imobis;
