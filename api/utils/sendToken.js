

export const send_Token = (res, token) => {

    const options = {
        maxAge:  60 * 60 * 1000,
        httpOnly: true,
    }

    res.cookie("token", token, options)
}