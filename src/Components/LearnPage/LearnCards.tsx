import React, { useEffect, useState } from 'react'

import { Button } from 'antd'
import { useSelector } from 'react-redux'

import { addGradeTC, CardsType, getCardsTC } from '../../Store/cards-reducer'
import { useAppDispatch, useAppSelector } from '../../Store/store'
import { BackArrow } from '../BackArrow/BackArrow'

import style from './LearnCards.module.css'

const grades = ['не знал', 'забыл', 'долго думал', 'перепутал', 'знал']

const getCard = (cards: CardsType[]) => {
  const sum = cards.reduce((acc, card) => acc + (6 - card.grade) * (6 - card.grade), 0)
  const rand = Math.random() * sum
  const res = cards.reduce(
    (acc: { sum: number; id: number }, card, i) => {
      const newSum = acc.sum + (6 - card.grade) * (6 - card.grade)

      return { sum: newSum, id: newSum < rand ? i : acc.id }
    },
    { sum: 0, id: -1 }
  )

  return cards[res.id + 1]
}

export const LearnCards = () => {
  const [isChecked, setIsChecked] = useState<boolean>(false)
  const [first, setFirst] = useState<boolean>(true)
  const [grade, setGrade] = useState(1)

  const cards = useAppSelector(state => state.cards.cards)
  const id = useAppSelector(state => state.cards.queryParams.cardsPack_id)

  const [card, setCard] = useState<any>({
    _id: 'fake',
    cardsPack_id: '',

    answer: 'answer fake',
    question: 'question fake',
    grade: 0,
    shots: 0,

    type: '',
    rating: 0,
    more_id: '',

    created: '',
    updated: '',
  })

  console.log(card)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (first) {
      dispatch(getCardsTC(id))
      setFirst(false)
    }

    if (cards.length > 0) setCard(getCard(cards))
  }, [dispatch, id, cards, first])

  const onNext = () => {
    dispatch(addGradeTC({ grade: grade, card_id: card._id }))
    setIsChecked(false)

    if (cards.length > 0) {
      setCard(getCard(cards))
    }
  }

  return (
    <div className={style.wrapper}>
      <BackArrow url={'/packs'} />
      <div className={style.learnCardContainer}>
        <h2>LearnPage</h2>
        <div className={style.learnCard}>
          <div>
            <span className={style.answerQuestionBold}> Qestion:</span> {card.question}
          </div>
          <div>
            <Button
              type="primary"
              htmlType="submit"
              shape="round"
              onClick={() => setIsChecked(true)}
              className={style.button}
            >
              Show Answer
            </Button>
          </div>
          {isChecked && (
            <>
              <div>
                <span className={style.answerQuestionBold}>Answer: </span>
                {card.answer}
              </div>

              {grades.map((g, i) => (
                <Button
                  className={style.gradeButton}
                  key={'grade-' + i}
                  onClick={() => {
                    setGrade(i + 1)
                  }}
                >
                  {g}
                </Button>
              ))}

              <div>
                <Button onClick={onNext} shape="round" type="primary" className={style.button}>
                  Next
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
