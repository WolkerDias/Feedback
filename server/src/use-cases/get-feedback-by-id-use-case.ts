import { FeedbacksRepository } from "../repositories/feedbacks-repository";

interface GetFeedbackByIdUseCaseRequest {
    id: string;
}

export class GetFeedbackByIdUseCase {
    constructor(
        private feedbacksRepository: FeedbacksRepository
    ){}

    async execute(request: GetFeedbackByIdUseCaseRequest) {
        const { id } = request;
        const feedback = await this.feedbacksRepository.getById({ id });
        return feedback;
    }
}