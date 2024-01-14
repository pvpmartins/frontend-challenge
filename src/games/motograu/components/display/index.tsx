import React, { useContext, useEffect, useState } from 'react'
import ProgressBar from '@/core/components/progress-bar'
import If from '@/core/components/conditions/if'
import { GameStatus } from '@/core/providers/enums/game-status'
import { CrashGameContext } from '@/core/providers/games/crash-game.provider'
import {
  CircularProgressbar,
  buildStyles,
} from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'

type Props = {
  color: string
}

export default function Display({ color }: Props) {
  const { startTimeout, gameStatus, multiplier } =
    useContext<any>(CrashGameContext)

  const message = (time) => {
    if (time >= 2 && time <= 6) {
      return (
        <h1
          style={{ fontFamily: 'ArcadeGameFont, sans-serif' }}
          className="absolute top-12 text-red-800 text-2xl"
        >
          Xô, caramelo!
        </h1>
      )
    } else if (time > 6 && time < 10) {
      return (
        <h1
          style={{ fontFamily: 'ArcadeGameFont, sans-serif' }}
          className="absolute top-12 text-red-800 text-2xl"
        >
          Larga do meu grau!
        </h1>
      )
    }
  }

  return (
    <div className="absolute top-4 sm:top-24 pointer-events-none left-0 flex flex-col gap-3 justify-center items-center w-full h-full">
      <If condition={gameStatus == GameStatus.IDLE}>
        <div className="w-full max-md:bottom-3 max-md:absolute flex flex-col items-center justify-center">
          <div className="w-44">
            {/* <ProgressBar
              max={10}
              value={startTimeout}
              color={color}
            /> */}
            <CircularProgressbar
              value={startTimeout}
              maxValue={10}
              text={`${startTimeout}`}
              className="h-24 top-4 relative"
              styles={buildStyles({
                // Rotation of path and trail, in number of turns (0-1)
                rotation: 0.25,

                // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                strokeLinecap: 'butt',

                // Text size
                textSize: '50px',

                // How long animation takes to go from one percentage to another, in seconds
                pathTransitionDuration: 0.5,

                // Can specify path transition in more detail, or remove it entirely
                // pathTransition: 'none',

                // Colors
                pathColor: `rgba(245, 49, 49, ${
                  (12 - startTimeout) / 10
                })`,
                textColor: 'black',
                trailColor: '#d6d6d6',
                backgroundColor: '#3e98c7',
              })}
            />
          </div>
          {startTimeout > 3 && (
            <h1
              className="absolute"
              style={{
                fontFamily: 'ArcadeGameFont, sans-serif',
                top: '5rem',
              }}
            >
              Vai começar!
            </h1>
          )}
          {startTimeout <= 3 && (
            <h1 style={{ top: '5rem' }} className="absolute">
              Pronto?!
            </h1>
          )}
        </div>
      </If>

      <If condition={gameStatus == GameStatus.RUNNING}>
        <div className="relative flex justify-center items-center">
          <h1
            className="text-4xl max-md:bottom-12 max-md:absolute md:text-6xl lg:text-6xl font-bold text-gray-200 drop-shadow"
            style={{
              WebkitTextStroke: '1px #000',
            }}
          >
            {multiplier?.toFixed(2)}x
          </h1>
        </div>

        {message(multiplier)}
      </If>

      <If condition={gameStatus == GameStatus.MAINTENANCE}>
        <div className="relative flex justify-center items-center">
          <h1
            className="text-2xl md:text-3xl uppercase lg:text-3xl font-bold text-gray-200 drop-shadow"
            style={{
              WebkitTextStroke: '1px #000',
            }}
          >
            Em manutenção!
          </h1>
        </div>
      </If>

      <If condition={gameStatus == GameStatus.GAME_OVER}>
        <h1
          className="text-2xl sm:text-2xl text-gray-200 font-extrabold uppercase relative top-4"
          style={{
            WebkitTextStroke: '1px #000',
          }}
        >
          O piloto caiu!
        </h1>
        <h1
          className={`text-3xl md:text-6xl lg:text-6xl font-bold text-red-600 drop-shadow top-4`}
          style={{
            WebkitTextStroke: '1px #000',
          }}
        >
          {multiplier.toFixed(2)}x
        </h1>
        <h1 className="top-20 text-3xl absolute">
          Cachorro disgramado!
        </h1>
      </If>
    </div>
  )
}
