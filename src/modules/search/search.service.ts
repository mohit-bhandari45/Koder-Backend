import ProblemModel from "../problems/problem.model"

export const searchProblems = async (query: string, skip: number, limit: number) => {
    let filter: any = { $text: { $search: query } };
    let projection: any = { score: { $meta: "textScore" }, _id: 1, title: 1, difficulty: 1 };
    let sort: any = { score: { $meta: "textScore" } };

    let results = await ProblemModel.find(filter, projection)
        .sort(sort)
        .skip(skip)
        .limit(limit)
        .lean();

    let total = await ProblemModel.countDocuments(filter);

    if (results.length === 0) {
        filter = {
            $or: [
                { title: { $regex: query, $options: "i" } },
                { description: { $regex: query, $options: "i" } },
                { tags: { $regex: query, $options: "i" } }
            ]
        }
        projection = { _id: 1, title: 1, dificulty: 1 };
        sort = {};

        results = await ProblemModel.find(filter, projection)
            .skip(skip)
            .limit(limit)
            .lean();

        total = await ProblemModel.countDocuments(filter);
    }

    return { problems: results, total };
}