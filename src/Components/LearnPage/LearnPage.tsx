import React, { useEffect, useState } from 'react'

import { Button } from 'antd'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'

import { CardsType, getCardsTC } from '../../Store/cards-reducer'
import { useAppDispatch, useAppSelector } from '../../Store/store'

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

  console.log('test: ', sum, rand, res)

  return cards[res.id + 1]
}

const LearnPage = () => {
  const [isChecked, setIsChecked] = useState<boolean>(false)
  const [first, setFirst] = useState<boolean>(true)

  const cards = useAppSelector(state => state.cards.cards)
  const id = '5f952ae3d231ec20d83d9ccb'
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
    setIsChecked(false)

    if (cards.length > 0) {
      setCard(getCard(cards))
    }
  }

  return (
    <div>
      LearnPage
      <div>{card.question}</div>
      <div>
        <Button onClick={() => setIsChecked(true)}>check</Button>
      </div>
      {isChecked && (
        <>
          <div>{card.answer}</div>

          {grades.map((g, i) => (
            <Button key={'grade-' + i} onClick={() => {}}>
              {g}
            </Button>
          ))}

          <div>
            <Button onClick={onNext}>next</Button>
          </div>
        </>
      )}
    </div>
  )
}

export default LearnPage
