import express from 'express';
import { NodemaillerMailAdapter } from './adapters/nodemailer/nodemailer-mail-adapter';
import { PrismaFeedbacksRepository } from './repositories/prisma/prisma-feedbacks-repository';
import { EditFeedbackUseCase } from './use-cases/edit-feedback-use-case';
import { GetFeedbackByIdUseCase } from './use-cases/get-feedback-by-id-use-case';
import { ListFeedbackUseCase } from './use-cases/list-feedback-use-case';
import { SubmitFeedbackUseCase } from './use-cases/submit-feedback-use-case';

export const routes = express.Router()

routes.post('/feedbacks', async (req, res) => {
    const { type, comment, screenshot } = req.body;

    const prismaFeedbacksRepository = new PrismaFeedbacksRepository()
    const nodemaillerMailAdapter = new NodemaillerMailAdapter()

    const submitFeedbackUseCase = new SubmitFeedbackUseCase(
        prismaFeedbacksRepository,
        nodemaillerMailAdapter
    )

        await submitFeedbackUseCase.execute({
            type,
            comment,
            screenshot,
        })


    return res.status(201).send();
});

routes.get('/feedbacks', async (req, res) => {

    const prismaFeedbacksRepository = new PrismaFeedbacksRepository()

    const listFeedbackUseCase = new ListFeedbackUseCase(
        prismaFeedbacksRepository,
    )

        const feedbacks = await listFeedbackUseCase.execute()


    return res.status(201).send(feedbacks);
});

routes.get('/feedback/:id', async (req, res) => {

    const id = req.params.id;
    const prismaFeedbacksRepository = new PrismaFeedbacksRepository()

    const getFeedbackByIdUseCase = new GetFeedbackByIdUseCase(
        prismaFeedbacksRepository,
    )

        const feedback = await getFeedbackByIdUseCase.execute({ id })


    return res.status(201).send(feedback);
});

routes.put('/feedback/:id', async (req, res) => {

    const id = req.params.id;
    const {type, comment, screenshot } = req.body;

    const prismaFeedbacksRepository = new PrismaFeedbacksRepository()
    const nodemaillerMailAdapter = new NodemaillerMailAdapter()

    const editFeedbackUseCase = new EditFeedbackUseCase(
        prismaFeedbacksRepository,
        nodemaillerMailAdapter
    )

        await editFeedbackUseCase.execute({
            id,
            type,
            comment,
            screenshot,
        })


    return res.status(201).send();
});