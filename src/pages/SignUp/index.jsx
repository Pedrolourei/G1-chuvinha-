import React, { useState } from "react";
import { Keyboard, Text } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigation } from '@react-navigation/native';
import { format } from 'date-fns';

import DateP from "../../components/DateP";
import TextInput from "../../components/TextInput";
import { createUserSchema } from '../../utils/createUserValidation';
import api from '../../services/api';
import backgroundImg from '../../assets/Background.png';
import {
    BackgroundImage,
    BackgroundText,
    BackgroundTextAlt,
    Container,
    ErrorText,
    FormArea,
    InputContainer,
    Label,
    ScrollViewContent,
    Button,
    ButtonText
} from './styles';

export default function App() {
    const navigation = useNavigation();
    const [showDatePicker, setShowDatePicker] = useState(false);

    const { control, handleSubmit, reset, formState: { errors } } = useForm({
        defaultValues: {
            name: "",
            email: "",
            password: "",
            cpf: "",
            birth_date: new Date(),
            city: "",
        },
        resolver: yupResolver(createUserSchema),
    });

    const onSubmit = async (data) => {
        Keyboard.dismiss();

        try {
            const birthDate = format(new Date(data.birth_date), 'yyyy-MM-dd');

            const dataApi = {
                name: data.name,
                email: data.email.toLowerCase(),
                password: data.password,
                cpf: data.cpf,
                birth_date: birthDate,
                city: data.city,
                salary: 0
            };

            await api.post('/users', dataApi);

            reset({
                name: "",
                email: "",
                cpf: "",
                birth_date: new Date(),
                city: "",
            });
            navigation.navigate('SignIn')
        } catch (error) {
            console.error("Erro ao enviar dados:", error.message);
        }
    }

    return (
        <>
            <BackgroundImage source={backgroundImg}>
                <BackgroundText>Criar Conta</BackgroundText>
                <BackgroundTextAlt>Insira os seus dados</BackgroundTextAlt>
            </BackgroundImage>
            <Container>
                <ScrollViewContent>
                    <FormArea>
                        <InputContainer>
                            <Controller
                                control={control}
                                render={({ field: { onChange, value } }) => (
                                    <>
                                        <Label>Nome Completo</Label>
                                        <TextInput
                                            name="name"
                                            placeholder="Nome"
                                            onChange={onChange}
                                            value={value}
                                            error={errors.name}
                                        />
                                    </>
                                )}
                                name="name"
                            />
                        </InputContainer>

                        <InputContainer>
                            <Controller
                                control={control}
                                render={({ field: { onChange, value } }) => (
                                    <>
                                        <Label>E-mail</Label>
                                        <TextInput
                                            name="email"
                                            placeholder="E-mail"
                                            onChange={onChange}
                                            value={value}
                                            error={errors.email}
                                        />
                                    </>
                                )}
                                name="email"
                            />
                        </InputContainer>

                        <InputContainer>
                            <Controller
                                control={control}
                                render={({ field: { onChange, value } }) => (
                                    <>
                                        <Label>Senha</Label>
                                        <TextInput
                                            name="password"
                                            placeholder="Senha"
                                            onChange={onChange}
                                            value={value}
                                            secureTextEntry={true}
                                            error={errors.password}
                                        />
                                    </>
                                )}
                                name="password"
                            />
                        </InputContainer>

                        <InputContainer>
                            <Controller
                                control={control}
                                render={({ field: { onChange, value } }) => (
                                    <>
                                        <Label>CPF</Label>
                                        <TextInput
                                            name="cpf"
                                            placeholder="CPF"
                                            onChange={onChange}
                                            value={value}
                                            error={errors.cpf}
                                            keyboardType="numeric"
                                        />
                                    </>
                                )}
                                name="cpf"
                            />
                        </InputContainer>

                        <InputContainer>
                            <Controller
                                control={control}
                                render={({ field: { onChange, value } }) => (
                                    <>
                                        <Label>Cidade</Label>
                                        <TextInput
                                            name="city"
                                            placeholder="Cidade"
                                            onChange={onChange}
                                            value={value}
                                            error={errors.city}
                                        />
                                    </>
                                )}
                                name="city"
                            />
                        </InputContainer>

                        <InputContainer>
                            <Controller
                                control={control}
                                render={({ field: { onChange, value } }) => (
                                    <>
                                        <Label>Data de Nascimento</Label>
                                        <DatePicker
                                            value={value}
                                            onChange={onChange}
                                            showPicker={showDatePicker}
                                            setShowPicker={setShowDatePicker}
                                        />
                                        {errors.birth_date && <ErrorText>{errors.birth_date.message}</ErrorText>}
                                    </>
                                )}
                                name="birth_date"
                            />
                        </InputContainer>

                    </FormArea>
                    <InputContainer>
                        <Button onPress={handleSubmit(onSubmit)}>
                            <ButtonText>Enviar</ButtonText>
                        </Button>
                        <Button onPress={() => navigation.goBack()}>
                            <ButtonText>Voltar</ButtonText>
                        </Button>
                    </InputContainer>

                </ScrollViewContent>
            </Container>
        </>
    );
}