
import styled from 'styled-components';

export const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;
  
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-text: center;
  width: 100%;
  max-width: 300px;
`;

export const Input = styled.input`
  background: #ccc;
  border: 1px solid #ddd;
  color: #666;
  padding: 10px;
  border-radius: 4px;
  margin-bottom: 10px
  
  `;
