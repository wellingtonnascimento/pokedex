import { useState } from "react";

import api from "./services/api";

import pokeball from "./assets/pokeball.svg";
import GlobalStyles from "./styles/global";
import { Wrapper, Welcome, Form, Input, Button } from "./styles/styles";

const App = () => {
  const [pokemon, setPokemon] = useState("");
  const [error, setError] = useState(null);
  const [typedPokemon, setTypedPokemon] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (event) => {
    setTypedPokemon(event.target.value.toLowerCase());
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!typedPokemon) {
      return;
    }
    setIsLoading(true);
    try {
      const response = await api.get(`/pokemon/${typedPokemon}`);
      console.log(response.data);
      setPokemon(response.data);
      // setError(null);
      // setIsLoading(false);
    } catch (error) {
      setError("Pokemon não encontrado!");
      setIsLoading(false);
      setPokemon(null);
    }
  };

  return (
    <Wrapper>
      <Welcome>Pokémon Pokédex!</Welcome>
      <Form onSubmit={handleSubmit}>
        <Input
          value={typedPokemon}
          placeholder="Nome do pokemon/id"
          onChange={handleChange}
          hasError={!!error}
        />
        <Button type="submit">
          {isLoading ? (
            <span>carregando...</span>
          ) : (
            <>
              Buscar <img src={pokeball} alt="pokeball" />{" "}
            </>
          )}
        </Button>
      </Form>
      {error && <span>{error}</span>}
      {pokemon.name}
      <GlobalStyles />
    </Wrapper>
  );
};

export default App;
