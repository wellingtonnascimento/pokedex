import { useState } from "react";

import api from "./services/api";

import pokeball from "./assets/pokeball.svg";
import GlobalStyles from "./styles/global";
import {
  Wrapper,
  Welcome,
  Form,
  Input,
  Button,
  PokemonCard,
  AvatarWrapper,
  PokemonName,
  Avatar,
  PokemonDetails,
} from "./styles/styles";

import Spinner from "./components/Spinner";

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

      setPokemon({
        ...response.data,
        abilities: response.data.abilities.sort((a, b) =>
          a.ability.name.localeCompare(b.ability.name),
        ),
      });
      setError(null);
      setIsLoading(false);
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
      {isLoading && <Spinner />}
      {pokemon && (
        <PokemonCard key={pokemon.id}>
          <>
            <AvatarWrapper>
              <PokemonName>{pokemon.name}</PokemonName>
              <Avatar
                src={pokemon.sprites.other.dream_world["front_default"]}
                alt={pokemon.name}
              />
            </AvatarWrapper>
            <PokemonDetails>
              <span>
                <strong>Altura</strong>: {pokemon.height * 10} cm
              </span>
              <span>
                <strong>Peso</strong>: {pokemon.weight} kg
              </span>
              <span>
                <strong>Tipo</strong>: {pokemon.types[0].type.name}
              </span>
              <span>
                <strong>Habilidades</strong>:
                <ul>
                  {pokemon.abilities?.map((ability) => {
                    return <li key={ability.id}>{ability.ability.name}</li>;
                  })}
                </ul>
              </span>
              <span>
                <strong>id</strong>: {pokemon.id}
              </span>
            </PokemonDetails>
          </>
        </PokemonCard>
      )}
      <GlobalStyles />
    </Wrapper>
  );
};

export default App;
