module.exports={
     basicRequestFormat: function({method,table,where = '',set = ''}) {
        var request = ""
        let condition = where !== '' ? "WHERE " + where : ""
        switch (method) {
            case 'POST':
                request = `INSERT INTO ${table} ${set}`
                break;
            case 'PATCH':
                request = `UPDATE ${table} SET ${set} ${condition}`
                break;
            case 'DELETE':
                request = `DELETE FROM ${table} ${condition}`
                break;
            case 'GET':
            default:
                request = `SELECT * FROM ${table} ${condition}`
                break;
        }
        return request;
    
    }
}
