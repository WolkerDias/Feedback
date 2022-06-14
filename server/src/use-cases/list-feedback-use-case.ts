import { FeedbacksRepository } from "../repositories/feedbacks-repository";

export class ListFeedbackUseCase {
    constructor(
        private feedbacksRepository: FeedbacksRepository
    ){}

    async execute(){
        const feedbacks = await this.feedbacksRepository.listAll();
        return feedbacks;
    }
}