"use client";

import Modal from "@/components/ui/Modal";
import clsx from "clsx";
import { ChevronLeft, ChevronRight } from "lucide-react";
import React, { useState } from "react";

const FormModal = Modal;

const InvestmentStyleModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const [questionPage, setQuestionPage] = useState(0);
  const [isAccept, setIsAccept] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number[]>([
    0, 0, 0, 0, 0,
  ]);

  const handleNextQuestion = () => {
    setQuestionPage(questionPage + 1);
  };

  const handlePrevQuestion = () => {
    setQuestionPage(questionPage - 1);
  };

  return (
    <FormModal isOpen={isOpen} onClose={onClose} isClickOutsideClose={false}>
      <div className="flex flex-col gap-[20px] px-main w-[600px]">
        <h2 className="text-xl font-bold text-main-dark-gray">투자성향 설정</h2>

        <div
          className={clsx(
            "w-full h-[5px] rounded-full bg-main-dark-gray/10",
            questionPage === 0 && "hidden"
          )}
        >
          <div
            className={clsx(
              "h-full bg-main-blue rounded-full transition-all duration-300",
              questionPage === 1 && "w-1/5",
              questionPage === 2 && "w-2/5",
              questionPage === 3 && "w-3/5",
              questionPage === 4 && "w-4/5",
              questionPage === 5 && "w-5/5"
            )}
          ></div>
        </div>

        {questionPage === 0 && (
          <AcceptForm
            next={handleNextQuestion}
            setIsAccept={setIsAccept}
            isAccept={isAccept}
          />
        )}

        {questionPage === 1 && (
          <Question1
            selectedAnswer={selectedAnswer}
            setSelectedAnswer={setSelectedAnswer}
            prev={handlePrevQuestion}
            next={handleNextQuestion}
          />
        )}
        {questionPage === 2 && (
          <Question2
            selectedAnswer={selectedAnswer}
            setSelectedAnswer={setSelectedAnswer}
            prev={handlePrevQuestion}
            next={handleNextQuestion}
          />
        )}
        {questionPage === 3 && (
          <Question3
            selectedAnswer={selectedAnswer}
            setSelectedAnswer={setSelectedAnswer}
            prev={handlePrevQuestion}
            next={handleNextQuestion}
          />
        )}
        {questionPage === 4 && (
          <Question4
            selectedAnswer={selectedAnswer}
            setSelectedAnswer={setSelectedAnswer}
            prev={handlePrevQuestion}
            next={handleNextQuestion}
          />
        )}
        {questionPage === 5 && (
          <Question5
            selectedAnswer={selectedAnswer}
            setSelectedAnswer={setSelectedAnswer}
            prev={handlePrevQuestion}
            next={handleNextQuestion}
          />
        )}

        {questionPage === 6 && (
          <ResultForm
            onClose={onClose}
            prev={handlePrevQuestion}
            selectedAnswer={selectedAnswer}
          />
        )}
      </div>
    </FormModal>
  );
};

interface QuestionProps {
  prev: () => void;
  next: () => void;
  selectedAnswer: number[];
  setSelectedAnswer: (answer: number[]) => void;
}

const handleSelectAnswer = (
  questionIndex: number,
  answerIndex: number,
  selectedAnswer: number[],
  setSelectedAnswer: (answer: number[]) => void
) => {
  const copy = [...selectedAnswer];
  copy[questionIndex] = answerIndex;
  setSelectedAnswer(copy);
};

const AcceptForm = ({
  next,
  setIsAccept,
  isAccept,
}: {
  next: () => void;
  setIsAccept: (isAccept: boolean) => void;
  isAccept: boolean;
}) => {
  return (
    <div className="flex flex-col gap-main">
      <h2 className="text-lg font-semibold">
        투자자 성향을 알기 위해 동의가 필요해요
      </h2>

      <p className="text-sm text-main-gray leading-8 my-main">
        금융투자상품의 적합성 판단을 위해 투자자 성향에 대한 진단이 필요합니다.
        <br />
        해당 설문은 고객님의 투자 목적, 경험, 위험 선호도를 기반으로
        성향을분석하며,
        <br />
        결과는 향후 상품 추천 및 자산 포트폴리오 구성에 활용됩니다.
        <br />
        성향 분석을 위해 입력하신 정보는 관련 법령에 따라 안전하게 처리됩니다.
      </p>

      <label className="flex items-center gap-2 text-sm text-main-gray">
        <input
          type="checkbox"
          checked={isAccept}
          onChange={() => setIsAccept(!isAccept)}
        />
        <span className="text-sm text-main-gray leading-relaxed">
          본인은 투자자 성향 진단을 위한 정보 수집 및 활용에 동의합니다.
        </span>
      </label>

      <div className="flex justify-end">
        <button
          className={clsx(
            "text-sm text-main-dark-gray hover:text-main-blue hover:bg-main-blue/10 transition-all duration-300 rounded-main px-2 py-1 flex items-center gap-1",
            !isAccept && "text-main-gray bg-main-gray/10"
          )}
          onClick={next}
          disabled={!isAccept}
        >
          <span>동의</span>
        </button>
      </div>
    </div>
  );
};

const Question1 = ({
  next,
  selectedAnswer,
  setSelectedAnswer,
}: QuestionProps) => {
  return (
    <div className="flex flex-col gap-main">
      <h2 className="text-lg font-semibold">
        Q1. 귀하의 주된 투자 목적은 무엇입니까?
      </h2>

      <div className="grid grid-rows-5 gap-main">
        <button
          className={clsx(
            "w-fit hover:text-main-blue hover:bg-main-blue/10 transition-all duration-300 rounded-main px-main py-1 flex items-center gap-1",
            selectedAnswer[0] === 1 && "text-main-blue bg-main-blue/10"
          )}
          onClick={() => {
            handleSelectAnswer(0, 1, selectedAnswer, setSelectedAnswer);
          }}
        >
          원금 손실이 없도록 안정적인 자산 운용
        </button>
        <button
          className={clsx(
            "w-fit hover:text-main-blue hover:bg-main-blue/10 transition-all duration-300 rounded-main px-main py-1 flex items-center gap-1",
            selectedAnswer[0] === 2 && "text-main-blue bg-main-blue/10"
          )}
          onClick={() => {
            handleSelectAnswer(0, 2, selectedAnswer, setSelectedAnswer);
          }}
        >
          물가상승률을 웃도는 수익
        </button>
        <button
          className={clsx(
            "w-fit hover:text-main-blue hover:bg-main-blue/10 transition-all duration-300 rounded-main px-main py-1 flex items-center gap-1",
            selectedAnswer[0] === 3 && "text-main-blue bg-main-blue/10"
          )}
          onClick={() => {
            handleSelectAnswer(0, 3, selectedAnswer, setSelectedAnswer);
          }}
        >
          자산을 증식하고자 하는 목적
        </button>
        <button
          className={clsx(
            "w-fit hover:text-main-blue hover:bg-main-blue/10 transition-all duration-300 rounded-main px-main py-1 flex items-center gap-1",
            selectedAnswer[0] === 4 && "text-main-blue bg-main-blue/10"
          )}
          onClick={() => {
            handleSelectAnswer(0, 4, selectedAnswer, setSelectedAnswer);
          }}
        >
          고수익을 위해 위험도 감수
        </button>
        <button
          className={clsx(
            "w-fit hover:text-main-blue hover:bg-main-blue/10 transition-all duration-300 rounded-main px-main py-1 flex items-center gap-1",
            selectedAnswer[0] === 5 && "text-main-blue bg-main-blue/10"
          )}
          onClick={() => {
            handleSelectAnswer(0, 5, selectedAnswer, setSelectedAnswer);
          }}
        >
          단기 차익 실현을 위한 공격적 투자
        </button>
      </div>

      <div className="flex justify-end">
        <button
          className="text-sm text-main-dark-gray hover:text-main-blue hover:bg-main-blue/10 transition-all duration-300 rounded-main pl-2 pr-1 py-1 flex items-center gap-1"
          onClick={next}
          disabled={selectedAnswer[0] === 0}
        >
          <span>다음</span>
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
};

const Question2 = ({
  prev,
  next,
  selectedAnswer,
  setSelectedAnswer,
}: QuestionProps) => {
  return (
    <div className="flex flex-col gap-main">
      <h2 className="text-lg font-semibold">
        Q2. 금융상품(주식/채권 등) 투자 경험이 있으신가요?
      </h2>

      <div className="grid grid-rows-5 gap-main">
        <button
          className={clsx(
            "w-fit hover:text-main-blue hover:bg-main-blue/10 transition-all duration-300 rounded-main px-main py-1 flex items-center gap-1",
            selectedAnswer[1] === 1 && "text-main-blue bg-main-blue/10"
          )}
          onClick={() => {
            handleSelectAnswer(1, 1, selectedAnswer, setSelectedAnswer);
          }}
        >
          원금 손실이 없도록 안정적인 자산 운용
        </button>
        <button
          className={clsx(
            "w-fit hover:text-main-blue hover:bg-main-blue/10 transition-all duration-300 rounded-main px-main py-1 flex items-center gap-1",
            selectedAnswer[1] === 2 && "text-main-blue bg-main-blue/10"
          )}
          onClick={() => {
            handleSelectAnswer(1, 2, selectedAnswer, setSelectedAnswer);
          }}
        >
          물가상승률을 웃도는 수익
        </button>
        <button
          className={clsx(
            "w-fit hover:text-main-blue hover:bg-main-blue/10 transition-all duration-300 rounded-main px-main py-1 flex items-center gap-1",
            selectedAnswer[1] === 3 && "text-main-blue bg-main-blue/10"
          )}
          onClick={() => {
            handleSelectAnswer(1, 3, selectedAnswer, setSelectedAnswer);
          }}
        >
          자산을 증식하고자 하는 목적
        </button>
        <button
          className={clsx(
            "w-fit hover:text-main-blue hover:bg-main-blue/10 transition-all duration-300 rounded-main px-main py-1 flex items-center gap-1",
            selectedAnswer[1] === 4 && "text-main-blue bg-main-blue/10"
          )}
          onClick={() => {
            handleSelectAnswer(1, 4, selectedAnswer, setSelectedAnswer);
          }}
        >
          고수익을 위해 위험도 감수
        </button>
        <button
          className={clsx(
            "w-fit hover:text-main-blue hover:bg-main-blue/10 transition-all duration-300 rounded-main px-main py-1 flex items-center gap-1",
            selectedAnswer[1] === 5 && "text-main-blue bg-main-blue/10"
          )}
          onClick={() => {
            handleSelectAnswer(1, 5, selectedAnswer, setSelectedAnswer);
          }}
        >
          단기 차익 실현을 위한 공격적 투자
        </button>
      </div>

      <div className="flex justify-end">
        <button
          className="text-sm text-main-dark-gray hover:text-main-blue hover:bg-main-blue/10 transition-all duration-300 rounded-main pr-2 pl-1 py-1 flex items-center gap-1"
          onClick={prev}
        >
          <ChevronLeft size={16} />
          <span>이전</span>
        </button>
        <button
          className="text-sm text-main-dark-gray hover:text-main-blue hover:bg-main-blue/10 transition-all duration-300 rounded-main pl-2 pr-1 py-1 flex items-center gap-1"
          onClick={next}
          disabled={selectedAnswer[1] === 0}
        >
          <span>다음</span>
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
};

const Question3 = ({
  prev,
  next,
  selectedAnswer,
  setSelectedAnswer,
}: QuestionProps) => {
  return (
    <div className="flex flex-col gap-main">
      <h2 className="text-lg font-semibold">
        Q3. 1년 내 원금의 20% 손실 가능성이 있는 투자상품을 추천받는다면?
      </h2>

      <div className="grid grid-rows-5 gap-main">
        <button
          className={clsx(
            "w-fit hover:text-main-blue hover:bg-main-blue/10 transition-all duration-300 rounded-main px-main py-1 flex items-center gap-1",
            selectedAnswer[2] === 1 && "text-main-blue bg-main-blue/10"
          )}
          onClick={() => {
            handleSelectAnswer(2, 1, selectedAnswer, setSelectedAnswer);
          }}
        >
          원금 손실이 없도록 안정적인 자산 운용
        </button>
        <button
          className={clsx(
            "w-fit hover:text-main-blue hover:bg-main-blue/10 transition-all duration-300 rounded-main px-main py-1 flex items-center gap-1",
            selectedAnswer[2] === 2 && "text-main-blue bg-main-blue/10"
          )}
          onClick={() => {
            handleSelectAnswer(2, 2, selectedAnswer, setSelectedAnswer);
          }}
        >
          물가상승률을 웃도는 수익
        </button>
        <button
          className={clsx(
            "w-fit hover:text-main-blue hover:bg-main-blue/10 transition-all duration-300 rounded-main px-main py-1 flex items-center gap-1",
            selectedAnswer[2] === 3 && "text-main-blue bg-main-blue/10"
          )}
          onClick={() => {
            handleSelectAnswer(2, 3, selectedAnswer, setSelectedAnswer);
          }}
        >
          자산을 증식하고자 하는 목적
        </button>
        <button
          className={clsx(
            "w-fit hover:text-main-blue hover:bg-main-blue/10 transition-all duration-300 rounded-main px-main py-1 flex items-center gap-1",
            selectedAnswer[2] === 4 && "text-main-blue bg-main-blue/10"
          )}
          onClick={() => {
            handleSelectAnswer(2, 4, selectedAnswer, setSelectedAnswer);
          }}
        >
          고수익을 위해 위험도 감수
        </button>
        <button
          className={clsx(
            "w-fit hover:text-main-blue hover:bg-main-blue/10 transition-all duration-300 rounded-main px-main py-1 flex items-center gap-1",
            selectedAnswer[2] === 5 && "text-main-blue bg-main-blue/10"
          )}
          onClick={() => {
            handleSelectAnswer(2, 5, selectedAnswer, setSelectedAnswer);
          }}
        >
          단기 차익 실현을 위한 공격적 투자
        </button>
      </div>

      <div className="flex justify-end">
        <button
          className="text-sm text-main-dark-gray hover:text-main-blue hover:bg-main-blue/10 transition-all duration-300 rounded-main pr-2 pl-1 py-1 flex items-center gap-1"
          onClick={prev}
        >
          <ChevronLeft size={16} />
          <span>이전</span>
        </button>
        <button
          className="text-sm text-main-dark-gray hover:text-main-blue hover:bg-main-blue/10 transition-all duration-300 rounded-main pl-2 pr-1 py-1 flex items-center gap-1"
          onClick={next}
          disabled={selectedAnswer[2] === 0}
        >
          <span>다음</span>
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
};

const Question4 = ({
  prev,
  next,
  selectedAnswer,
  setSelectedAnswer,
}: QuestionProps) => {
  return (
    <div className="flex flex-col gap-main">
      <h2 className="text-lg font-semibold">
        Q4. 투자 가능한 기간은 어느 정도인가요?
      </h2>

      <div className="grid grid-rows-5 gap-main">
        <button
          className={clsx(
            "w-fit hover:text-main-blue hover:bg-main-blue/10 transition-all duration-300 rounded-main px-main py-1 flex items-center gap-1",
            selectedAnswer[3] === 1 && "text-main-blue bg-main-blue/10"
          )}
          onClick={() => {
            handleSelectAnswer(3, 1, selectedAnswer, setSelectedAnswer);
          }}
        >
          원금 손실이 없도록 안정적인 자산 운용
        </button>
        <button
          className={clsx(
            "w-fit hover:text-main-blue hover:bg-main-blue/10 transition-all duration-300 rounded-main px-main py-1 flex items-center gap-1",
            selectedAnswer[3] === 2 && "text-main-blue bg-main-blue/10"
          )}
          onClick={() => {
            handleSelectAnswer(3, 2, selectedAnswer, setSelectedAnswer);
          }}
        >
          물가상승률을 웃도는 수익
        </button>
        <button
          className={clsx(
            "w-fit hover:text-main-blue hover:bg-main-blue/10 transition-all duration-300 rounded-main px-main py-1 flex items-center gap-1",
            selectedAnswer[3] === 3 && "text-main-blue bg-main-blue/10"
          )}
          onClick={() => {
            handleSelectAnswer(3, 3, selectedAnswer, setSelectedAnswer);
          }}
        >
          자산을 증식하고자 하는 목적
        </button>
        <button
          className={clsx(
            "w-fit hover:text-main-blue hover:bg-main-blue/10 transition-all duration-300 rounded-main px-main py-1 flex items-center gap-1",
            selectedAnswer[3] === 4 && "text-main-blue bg-main-blue/10"
          )}
          onClick={() => {
            handleSelectAnswer(3, 4, selectedAnswer, setSelectedAnswer);
          }}
        >
          고수익을 위해 위험도 감수
        </button>
        <button
          className={clsx(
            "w-fit hover:text-main-blue hover:bg-main-blue/10 transition-all duration-300 rounded-main px-main py-1 flex items-center gap-1",
            selectedAnswer[3] === 5 && "text-main-blue bg-main-blue/10"
          )}
          onClick={() => {
            handleSelectAnswer(3, 5, selectedAnswer, setSelectedAnswer);
          }}
        >
          단기 차익 실현을 위한 공격적 투자
        </button>
      </div>

      <div className="flex justify-end">
        <button
          className="text-sm text-main-dark-gray hover:text-main-blue hover:bg-main-blue/10 transition-all duration-300 rounded-main pr-2 pl-1 py-1 flex items-center gap-1"
          onClick={prev}
        >
          <ChevronLeft size={16} />
          <span>이전</span>
        </button>
        <button
          className="text-sm text-main-dark-gray hover:text-main-blue hover:bg-main-blue/10 transition-all duration-300 rounded-main pl-2 pr-1 py-1 flex items-center gap-1"
          onClick={next}
          disabled={selectedAnswer[3] === 0}
        >
          <span>다음</span>
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
};

const Question5 = ({
  prev,
  next,
  selectedAnswer,
  setSelectedAnswer,
}: QuestionProps) => {
  return (
    <div className="flex flex-col gap-main">
      <h2 className="text-lg font-semibold">
        Q5. 투자 원금 대비 손실 가능성이 있을 때 본인의 반응은?
      </h2>

      <div className="grid grid-rows-5 gap-main">
        <button
          className={clsx(
            "w-fit hover:text-main-blue hover:bg-main-blue/10 transition-all duration-300 rounded-main px-main py-1 flex items-center gap-1",
            selectedAnswer[4] === 1 && "text-main-blue bg-main-blue/10"
          )}
          onClick={() => {
            handleSelectAnswer(4, 1, selectedAnswer, setSelectedAnswer);
          }}
        >
          원금 손실이 없도록 안정적인 자산 운용
        </button>
        <button
          className={clsx(
            "w-fit hover:text-main-blue hover:bg-main-blue/10 transition-all duration-300 rounded-main px-main py-1 flex items-center gap-1",
            selectedAnswer[4] === 2 && "text-main-blue bg-main-blue/10"
          )}
          onClick={() => {
            handleSelectAnswer(4, 2, selectedAnswer, setSelectedAnswer);
          }}
        >
          물가상승률을 웃도는 수익
        </button>
        <button
          className={clsx(
            "w-fit hover:text-main-blue hover:bg-main-blue/10 transition-all duration-300 rounded-main px-main py-1 flex items-center gap-1",
            selectedAnswer[4] === 3 && "text-main-blue bg-main-blue/10"
          )}
          onClick={() => {
            handleSelectAnswer(4, 3, selectedAnswer, setSelectedAnswer);
          }}
        >
          자산을 증식하고자 하는 목적
        </button>
        <button
          className={clsx(
            "w-fit hover:text-main-blue hover:bg-main-blue/10 transition-all duration-300 rounded-main px-main py-1 flex items-center gap-1",
            selectedAnswer[4] === 4 && "text-main-blue bg-main-blue/10"
          )}
          onClick={() => {
            handleSelectAnswer(4, 4, selectedAnswer, setSelectedAnswer);
          }}
        >
          고수익을 위해 위험도 감수
        </button>
        <button
          className={clsx(
            "w-fit hover:text-main-blue hover:bg-main-blue/10 transition-all duration-300 rounded-main px-main py-1 flex items-center gap-1",
            selectedAnswer[4] === 5 && "text-main-blue bg-main-blue/10"
          )}
          onClick={() => {
            handleSelectAnswer(4, 5, selectedAnswer, setSelectedAnswer);
          }}
        >
          단기 차익 실현을 위한 공격적 투자
        </button>
      </div>

      <div className="flex justify-end">
        <button
          className="text-sm text-main-dark-gray hover:text-main-blue hover:bg-main-blue/10 transition-all duration-300 rounded-main pr-2 pl-1 py-1 flex items-center gap-1"
          onClick={prev}
        >
          <ChevronLeft size={16} />
          <span>이전</span>
        </button>
        <button
          className="text-sm text-main-dark-gray hover:text-main-blue hover:bg-main-blue/10 transition-all duration-300 rounded-main pl-2 pr-1 py-1 flex items-center gap-1"
          onClick={next}
          disabled={selectedAnswer[4] === 0}
        >
          <span>다음</span>
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
};

const ResultForm = ({
  onClose,
  prev,
  selectedAnswer,
}: {
  onClose: () => void;
  prev: () => void;
  selectedAnswer: number[];
}) => {
  return (
    <div className="flex flex-col gap-main">
      <h2 className="text-lg font-semibold">투자자 성향 분석 결과</h2>

      <div>{selectedAnswer.reduce((acc, curr) => acc + curr, 0)}점임</div>

      <div className="flex justify-end">
        <button
          className="text-sm text-main-dark-gray hover:text-main-blue hover:bg-main-blue/10 transition-all duration-300 rounded-main pr-2 pl-1 py-1 flex items-center gap-1"
          onClick={prev}
        >
          <ChevronLeft size={16} />
          <span>이전</span>
        </button>
      </div>
    </div>
  );
};

export default InvestmentStyleModal;
