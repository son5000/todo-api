import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            maxLength: 30, // 제목의 최대 길이 30자
        },
        description: {
            type: String, // 설명은 선택 사항
        },
        isComplete: {
            type: Boolean,
            required: true, // 완료 여부는 반드시 있어야 함
            default: false, // 기본값은 false (미완료 상태)
        },
    },
    {
        timestamps: true, // 생성 및 수정 시간 자동 기록
    },
);

const Task = mongoose.model('Task', TaskSchema);

export default Task;
