import React from "react";

import styles from "./styles.module.css";

import CardChecked from "@/components/CardChecked";

const OptionSelector = ({
  label, // "OP1" ou "OP2"
  isVisible, // boolean: se as opções estão visíveis
  setIsVisible, // função para alterar a visibilidade
  selectedValue, // value da opção atualmente selecionada
  options, // lista de opções disponíveis
  onSelect, // função chamada ao clicar em uma opção
  getSelectedLabel, // função para obter o label do selecionado
  isDisabled, // boolean que indica se deve bloquear interação (ex: resultado já liberado)
}) => {
  return (
    <div className={styles.contentB1Choices}>
      {!isVisible && (
        <div className={styles.contentButtonAndLabel}>
          {!isDisabled && (
            <button
              onClick={() => setIsVisible(true)}
              className={styles.buttonExperiment}
            >
              {label}
            </button>
          )}
          <label>
            Choice: <b>{getSelectedLabel()}</b>
          </label>
        </div>
      )}

      {isVisible && (
        <>
          {!isDisabled && (
            <button
              onClick={() => setIsVisible(false)}
              className={styles.buttonExperiment}
            >
              {label}
            </button>
          )}
          <div className={styles.minHeightAnswer}>
            {options.map((item, index) => (
              <div key={index}>
                <CardChecked
                  handleClick={() => onSelect(item.value)}
                  isClicked={selectedValue === item.value}
                >
                  {item.label}
                </CardChecked>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default OptionSelector;
