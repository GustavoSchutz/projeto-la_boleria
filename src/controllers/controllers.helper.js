const STATUS_CODE = Object.freeze({
    OK: 200,
    CREATED: 201,
    BAD_REQUEST: 400,
    SERVER_ERROR: 500,
    CONFLICT: 409,
    UNPROCESSABLE_ENTITY: 422,
    NOT_FOUND: 404,
});

const STATUS_TEXT = Object.freeze({
    OK: 'ok',
    CREATED: 'created',
    BAD_REQUEST: 'bad request',
    SERVER_ERROR: 'internal error',
    CONFLICT: 'conflict',
    UNPROCESSABLE_ENTITY: 'unprocessable entity',
    NOT_FOUND: 'not found',
});

function badRequestResponse(res, text = STATUS_TEXT.BAD_REQUEST) {
    return res.status(STATUS_CODE.BAD_REQUEST).send(text);
}

function conflictResponse(res, text = STATUS_TEXT.CONFLICT) {
    return res.status(STATUS_CODE.CONFLICT).send(text);
}


export { badRequestResponse, conflictResponse }