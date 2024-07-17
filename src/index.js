import express from 'express';
import permifyConfiguration from './permify';
import { authorize } from './middleware';
const app = express();

app.use(express.json());
app.use((req, res, next) => {
    req.user = req.params.user;
    next();
})

new permifyConfiguration();

//This is sample api for example purpose 
app.post('/files/:user/create', authorize('team', 'create'), (req, res) => {
    return res.status(200).json({ status_code: 200, status: true, message: `You are authorized person to create file` });
});

app.post('/files/:user/delete', authorize('team', 'delete'), (req, res) => {
    return res.status(200).json({ status_code: 200, status: true, message: `You are authorized person to delete file` });
})

app.listen(process.env.PORT, () => {
    console.log(`Server started at port ${process.env.PORT}`);
})






